"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicineController_1 = require("../controllers/medicineController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', auth_1.protect, medicineController_1.getAllMedicines);
router.get('/:id', auth_1.protect, medicineController_1.getMedicine);
router.post('/', auth_1.protect, auth_1.adminOnly, medicineController_1.createMedicine);
router.put('/:id', auth_1.protect, auth_1.adminOnly, medicineController_1.updateMedicine);
router.delete('/:id', auth_1.protect, auth_1.adminOnly, medicineController_1.deleteMedicine);
exports.default = router;
