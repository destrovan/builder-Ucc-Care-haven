import { RequestHandler } from "express";
import { query } from "../config/database";

// Generate tracking ID function
function generateTrackingId(): string {
  return "UCC-CARE-" + Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Submit a new report
export const submitReport: RequestHandler = async (req, res) => {
  try {
    const { urgency, description, contactPreference, isAnonymous, studentId } =
      req.body;

    if (!description || !urgency) {
      return res
        .status(400)
        .json({ error: "Description and urgency are required" });
    }

    const trackingId = generateTrackingId();

    // Insert report
    const reportResult = await query(
      `INSERT INTO reports 
       (tracking_id, student_id, is_anonymous, priority, description, contact_preference, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'new') 
       RETURNING id, tracking_id`,
      [
        trackingId,
        isAnonymous ? null : studentId,
        isAnonymous,
        urgency,
        description,
        contactPreference,
      ],
    );

    const report = reportResult.rows[0];

    // Add initial update
    await query(
      `INSERT INTO report_updates (report_id, content, update_type, is_private)
       VALUES ($1, $2, 'submitted', false)`,
      [
        report.id,
        "Your support request has been received and is being reviewed by our professional team.",
      ],
    );

    res.json({
      success: true,
      trackingId: report.tracking_id,
      message: "Report submitted successfully",
    });
  } catch (error) {
    console.error("Submit report error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get report status by tracking ID
export const getReportStatus: RequestHandler = async (req, res) => {
  try {
    const { trackingId } = req.params;

    if (!trackingId) {
      return res.status(400).json({ error: "Tracking ID is required" });
    }

    // Get report details
    const reportResult = await query(
      `SELECT r.*, u.first_name, u.last_name 
       FROM reports r
       LEFT JOIN users u ON r.counselor_id = u.id 
       WHERE r.tracking_id = $1`,
      [trackingId],
    );

    if (reportResult.rows.length === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    const report = reportResult.rows[0];

    // Get all public updates for this report
    const updatesResult = await query(
      `SELECT ru.*, u.first_name, u.last_name 
       FROM report_updates ru
       LEFT JOIN users u ON ru.author_id = u.id
       WHERE ru.report_id = $1 AND ru.is_private = false
       ORDER BY ru.created_at ASC`,
      [report.id],
    );

    res.json({
      success: true,
      report: {
        id: report.tracking_id,
        status: report.status,
        priority: report.priority,
        submittedAt: report.submitted_at,
        lastUpdate: report.last_update,
        counselor:
          report.first_name && report.last_name
            ? `${report.first_name} ${report.last_name}`
            : "Unassigned",
        isAnonymous: report.is_anonymous,
      },
      updates: updatesResult.rows.map((update) => ({
        id: update.id,
        timestamp: update.created_at,
        type: update.update_type,
        message: update.content,
        author:
          update.first_name && update.last_name
            ? `${update.first_name} ${update.last_name}`
            : "System",
      })),
    });
  } catch (error) {
    console.error("Get report status error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get counselor cases (for counselor dashboard)
export const getCounselorCases: RequestHandler = async (req, res) => {
  try {
    const { counselorId } = req.params;

    const casesResult = await query(
      `SELECT r.*, u.first_name as student_first_name, u.last_name as student_last_name,
              cc.private_notes, cc.assigned_at
       FROM reports r
       LEFT JOIN counselor_cases cc ON r.id = cc.report_id
       LEFT JOIN users u ON r.student_id = u.id
       WHERE r.counselor_id = $1 OR cc.counselor_id = $1
       ORDER BY r.priority DESC, r.submitted_at DESC`,
      [counselorId],
    );

    const cases = casesResult.rows.map((case_) => ({
      id: case_.tracking_id,
      student: case_.is_anonymous
        ? "Anonymous Student"
        : `${case_.student_first_name || "Unknown"} ${case_.student_last_name || "Student"}`,
      priority: case_.priority,
      status: case_.status,
      submittedAt: case_.submitted_at,
      lastUpdate: case_.last_update,
      description: case_.description,
      isAnonymous: case_.is_anonymous,
    }));

    res.json({
      success: true,
      cases,
    });
  } catch (error) {
    console.error("Get counselor cases error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add update to report (counselor response)
export const addReportUpdate: RequestHandler = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { content, isPrivate, authorId } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Get report by tracking ID
    const reportResult = await query(
      "SELECT id FROM reports WHERE tracking_id = $1",
      [reportId],
    );

    if (reportResult.rows.length === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    const actualReportId = reportResult.rows[0].id;

    // Add update
    await query(
      `INSERT INTO report_updates (report_id, author_id, content, is_private, update_type)
       VALUES ($1, $2, $3, $4, 'response')`,
      [actualReportId, authorId, content, isPrivate],
    );

    // Update report's last_update timestamp
    await query(
      "UPDATE reports SET last_update = CURRENT_TIMESTAMP WHERE id = $1",
      [actualReportId],
    );

    res.json({
      success: true,
      message: "Update added successfully",
    });
  } catch (error) {
    console.error("Add report update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
