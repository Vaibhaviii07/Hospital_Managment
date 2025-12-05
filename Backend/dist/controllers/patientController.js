"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issuePrescription = exports.registerPatient = exports.getTodayPatients = exports.getPatient = exports.getAllPatients = void 0;
const Patient_1 = __importDefault(require("../models/Patient"));
const Doctor_1 = __importDefault(require("../models/Doctor"));
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient_1.default.find()
            .populate('doctor', 'name email specialization hospitalName')
            .populate('prescription.items.medicine', 'name genericName strength type company');
        res.json(patients);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllPatients = getAllPatients;
const getPatient = async (req, res) => {
    try {
        const patient = await Patient_1.default.findById(req.params.id)
            .populate('doctor', 'name email specialization hospitalName')
            .populate('prescription.items.medicine', 'name genericName strength type company');
        if (!patient)
            return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPatient = getPatient;
const getTodayPatients = async (req, res) => {
    try {
        const user = req.user;
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        let query = { registrationDate: { $gte: start, $lte: end } };
        // If user is a doctor, only show their patients
        if (user.role === 'doctor') {
            const doctor = await Doctor_1.default.findOne({ user: user._id });
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor profile not found' });
            }
            query.doctor = doctor._id;
        }
        const patients = await Patient_1.default.find(query)
            .populate('doctor', 'name email specialization hospitalName')
            .populate('prescription.items.medicine', 'name genericName strength type company');
        res.json(patients);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getTodayPatients = getTodayPatients;
const registerPatient = async (req, res) => {
    try {
        const { name, age, gender, phone, address, doctor, complaint } = req.body;
        // Set registration date to today
        const registrationDate = new Date();
        registrationDate.setHours(0, 0, 0, 0);
        const patient = await Patient_1.default.create({
            name,
            age,
            gender,
            phone,
            address,
            doctor,
            complaint,
            registrationDate,
        });
        const populatedPatient = await Patient_1.default.findById(patient._id)
            .populate('doctor', 'name email specialization hospitalName');
        res.status(201).json(populatedPatient);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.registerPatient = registerPatient;
const issuePrescription = async (req, res) => {
    try {
        const { items } = req.body;
        const patient = await Patient_1.default.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        // Check if doctor is authorized (doctor can only prescribe to their own patients)
        const user = req.user;
        if (user.role === 'doctor') {
            const doctor = await Doctor_1.default.findOne({ user: user._id });
            if (!doctor || doctor._id.toString() !== patient.doctor.toString()) {
                return res.status(403).json({ message: 'Not authorized to prescribe for this patient' });
            }
        }
        patient.prescription = {
            items: items || [],
            issuedDate: new Date(),
        };
        await patient.save();
        const populatedPatient = await Patient_1.default.findById(patient._id)
            .populate('doctor', 'name email specialization hospitalName')
            .populate('prescription.items.medicine', 'name genericName strength type company');
        res.json(populatedPatient);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.issuePrescription = issuePrescription;
