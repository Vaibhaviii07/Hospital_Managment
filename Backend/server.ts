import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import medicineRoutes from "./routes/medicineRoutes";
import patientRoutes from "./routes/patientRoutes";

dotenv.config();

const app = express();

// -----------------------------
// ✅ CORS CONFIGURATION
// -----------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow curl, mobile apps

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Authorization"],
  })
);

// -----------------------------
// PARSERS
// -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------
// MONGO CONNECTION
// -----------------------------
const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO_URI, {
    tls: MONGO_URI.startsWith("mongodb+srv://"), // enable TLS only for Atlas
    // tlsAllowInvalidCertificates: true // Uncomment only for testing local SSL issues
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// -----------------------------
// HEALTH CHECK
// -----------------------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// -----------------------------
// ROUTES
// -----------------------------
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/patients", patientRoutes);

// -----------------------------
// NOT FOUND HANDLER
// -----------------------------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// -----------------------------
// SERVER RUNNING
// -----------------------------
const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 CORS enabled for: ${allowedOrigins.join(", ")}`);
});

// Handle server errors
server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Please use a different port.`);
    process.exit(1);
  } else {
    console.error("❌ Server error:", error);
    process.exit(1);
  }
});
