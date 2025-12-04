"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
const medicineRoutes_1 = __importDefault(require("./routes/medicineRoutes"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
// Allowed origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
];
// CORS setup
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => res.send('Server running!'));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/doctors', doctorRoutes_1.default);
app.use('/api/medicines', medicineRoutes_1.default);
app.use('/api/patients', patientRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
