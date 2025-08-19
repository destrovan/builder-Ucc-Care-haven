import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { connectDatabase } from "./config/database";

// Import authentication routes
import { loginStudent, registerStudent, loginCounselor, loginAdmin } from "./routes/auth";

// Import reports routes
import { submitReport, getReportStatus, getCounselorCases, addReportUpdate } from "./routes/reports";

// Import resources routes
import { getResources, getResourceCategories, incrementViewCount, createResource, updateResource, deleteResource } from "./routes/resources";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize database connection
  connectDatabase();

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    res.json({ message: "ping " + ping });
  });

  // Legacy demo route
  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/student/login", loginStudent);
  app.post("/api/auth/student/register", registerStudent);
  app.post("/api/auth/counselor/login", loginCounselor);
  app.post("/api/auth/admin/login", loginAdmin);

  // Reports routes
  app.post("/api/reports", submitReport);
  app.get("/api/reports/:trackingId", getReportStatus);
  app.get("/api/counselor/:counselorId/cases", getCounselorCases);
  app.post("/api/reports/:reportId/updates", addReportUpdate);

  // Resources routes
  app.get("/api/resources", getResources);
  app.get("/api/resources/categories", getResourceCategories);
  app.post("/api/resources/:resourceId/view", incrementViewCount);
  app.post("/api/resources", createResource);
  app.put("/api/resources/:resourceId", updateResource);
  app.delete("/api/resources/:resourceId", deleteResource);

  return app;
}
