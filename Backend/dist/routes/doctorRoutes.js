"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controllers/doctorController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', auth_1.protect, doctorController_1.getAllDoctors);
router.get('/:id', auth_1.protect, doctorController_1.getDoctor);
router.post('/', auth_1.protect, auth_1.adminOnly, doctorController_1.createDoctor);
router.put('/:id', auth_1.protect, auth_1.adminOnly, doctorController_1.updateDoctor);
router.delete('/:id', auth_1.protect, auth_1.adminOnly, doctorController_1.deleteDoctor);
router.get('/hospital/:hospitalName', auth_1.protect, doctorController_1.getDoctorsByHospital);
exports.default = router;
