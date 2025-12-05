"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
const medicineRoutes_1 = __importDefault(require("./routes/medicineRoutes"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// -----------------------------
// CORS FIX FOR VITE + BACKEND
// -----------------------------
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
// Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// -----------------------------
// MONGO CONNECTION
// -----------------------------
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
});
// -----------------------------
// ROUTES
// -----------------------------
app.use("/api/auth", authRoutes_1.default);
app.use("/api/doctors", doctorRoutes_1.default);
app.use("/api/medicines", medicineRoutes_1.default);
app.use("/api/patients", patientRoutes_1.default);
// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" });
});
// Error handling middleware (must be last)
app.use(errorHandler_1.default);
// -----------------------------
// SERVER RUNNING
// -----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
});
