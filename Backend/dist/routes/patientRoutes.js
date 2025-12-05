"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientController_1 = require("../controllers/patientController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', auth_1.protect, auth_1.adminOnly, patientController_1.getAllPatients);
router.get('/today', auth_1.protect, patientController_1.getTodayPatients);
router.get('/:id', auth_1.protect, patientController_1.getPatient);
router.post('/', auth_1.protect, auth_1.adminOnly, patientController_1.registerPatient);
router.put('/:id/prescription', auth_1.protect, auth_1.doctorOnly, patientController_1.issuePrescription);
exports.default = router;
