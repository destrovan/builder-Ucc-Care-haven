import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { query } from "../config/database";

// Student login
export const loginStudent: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user in database
    const result = await query(
      "SELECT id, email, password_hash, role, status, first_name, last_name FROM users WHERE email = $1 AND role = $2",
      [email, "student"],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    // Check password (in real app, compare with bcrypt hash)
    // For demo purposes, we'll accept any password
    const isValidPassword = true; // await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (user.status !== "active") {
      return res.status(401).json({ error: "Account is not active" });
    }

    // Update last login
    await query(
      "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1",
      [user.id],
    );

    // Return user data (excluding password)
    const { password_hash, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Student registration
export const registerStudent: RequestHandler = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      studentId,
      phone,
      year,
      program,
      emergencyContact,
      emergencyPhone,
      password,
    } = req.body;

    // Check if user already exists
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const userResult = await query(
      `INSERT INTO users (email, password_hash, role, first_name, last_name, status, email_verified) 
       VALUES ($1, $2, 'student', $3, $4, 'active', true) RETURNING id`,
      [email, passwordHash, firstName, lastName],
    );

    const userId = userResult.rows[0].id;

    // Insert student profile
    await query(
      `INSERT INTO student_profiles 
       (user_id, student_id, phone, academic_year, program, emergency_contact_name, emergency_contact_phone, consent_counseling, consent_data_processing)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true, true)`,
      [
        userId,
        studentId,
        phone,
        year,
        program,
        emergencyContact,
        emergencyPhone,
      ],
    );

    res.json({
      success: true,
      message: "Registration successful",
      userId,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Counselor login
export const loginCounselor: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await query(
      "SELECT id, email, password_hash, role, status, first_name, last_name FROM users WHERE email = $1 AND role = $2",
      [email, "counselor"],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    // For demo, accept any password
    const isValidPassword = true;

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    await query(
      "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1",
      [user.id],
    );

    const { password_hash, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Counselor login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin login
export const loginAdmin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await query(
      "SELECT id, email, password_hash, role, status, first_name, last_name FROM users WHERE email = $1 AND role = $2",
      [email, "admin"],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    // For demo, accept any password
    const isValidPassword = true;

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    await query(
      "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1",
      [user.id],
    );

    const { password_hash, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
