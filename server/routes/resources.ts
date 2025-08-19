import { RequestHandler } from "express";
import { query } from "../config/database";

// Get all resources with optional filtering
export const getResources: RequestHandler = async (req, res) => {
  try {
    const { category, type, featured, search } = req.query;

    let baseQuery = `
      SELECT r.*, u.first_name, u.last_name 
      FROM resources r
      LEFT JOIN users u ON r.created_by = u.id
      WHERE r.status = 'published'
    `;

    const params: any[] = [];
    let paramIndex = 1;

    if (category && category !== "all") {
      baseQuery += ` AND r.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (type && type !== "all") {
      baseQuery += ` AND r.resource_type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }

    if (featured === "true") {
      baseQuery += ` AND r.is_featured = true`;
    }

    if (search) {
      baseQuery += ` AND (r.title ILIKE $${paramIndex} OR r.description ILIKE $${paramIndex} OR $${paramIndex} = ANY(r.tags))`;
      params.push(`%${search}%`);
    }

    baseQuery += ` ORDER BY r.is_featured DESC, r.view_count DESC, r.created_at DESC`;

    const result = await query(baseQuery, params);

    const resources = result.rows.map((resource) => ({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      type: resource.resource_type,
      category: resource.category,
      tags: resource.tags || [],
      duration: resource.duration_minutes
        ? `${resource.duration_minutes} min`
        : "Quick reference",
      rating: parseFloat(resource.rating) || 0,
      views: resource.view_count || 0,
      featured: resource.is_featured,
      url: resource.url || "#",
      createdBy:
        resource.first_name && resource.last_name
          ? `${resource.first_name} ${resource.last_name}`
          : "System",
    }));

    res.json({
      success: true,
      resources,
    });
  } catch (error) {
    console.error("Get resources error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get resource categories with counts
export const getResourceCategories: RequestHandler = async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        category,
        COUNT(*) as count
      FROM resources 
      WHERE status = 'published'
      GROUP BY category
      ORDER BY category
    `);

    const categories = [
      {
        id: "all",
        name: "All Resources",
        count: result.rows.reduce((sum, row) => sum + parseInt(row.count), 0),
      },
      ...result.rows.map((row) => ({
        id: row.category,
        name: row.category.charAt(0).toUpperCase() + row.category.slice(1),
        count: parseInt(row.count),
      })),
    ];

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Get resource categories error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Increment view count for a resource
export const incrementViewCount: RequestHandler = async (req, res) => {
  try {
    const { resourceId } = req.params;

    await query(
      "UPDATE resources SET view_count = view_count + 1 WHERE id = $1",
      [resourceId],
    );

    res.json({
      success: true,
      message: "View count updated",
    });
  } catch (error) {
    console.error("Increment view count error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new resource (admin only)
export const createResource: RequestHandler = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      resourceType,
      category,
      tags,
      url,
      durationMinutes,
      isFeatured,
      createdBy,
    } = req.body;

    if (!title || !resourceType || !category) {
      return res
        .status(400)
        .json({ error: "Title, type, and category are required" });
    }

    const result = await query(
      `INSERT INTO resources 
       (title, description, content, resource_type, category, tags, url, duration_minutes, is_featured, created_by, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'published')
       RETURNING id`,
      [
        title,
        description,
        content,
        resourceType,
        category,
        tags,
        url,
        durationMinutes,
        isFeatured,
        createdBy,
      ],
    );

    res.json({
      success: true,
      resourceId: result.rows[0].id,
      message: "Resource created successfully",
    });
  } catch (error) {
    console.error("Create resource error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update resource (admin only)
export const updateResource: RequestHandler = async (req, res) => {
  try {
    const { resourceId } = req.params;
    const updateFields = req.body;

    // Build dynamic update query
    const setClause = Object.keys(updateFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const values = [resourceId, ...Object.values(updateFields)];

    await query(
      `UPDATE resources SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
      values,
    );

    res.json({
      success: true,
      message: "Resource updated successfully",
    });
  } catch (error) {
    console.error("Update resource error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete resource (admin only)
export const deleteResource: RequestHandler = async (req, res) => {
  try {
    const { resourceId } = req.params;

    await query("DELETE FROM resources WHERE id = $1", [resourceId]);

    res.json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    console.error("Delete resource error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
