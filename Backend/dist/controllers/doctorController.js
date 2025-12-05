"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorsByHospital = exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.getDoctor = exports.getAllDoctors = void 0;
const Doctor_1 = __importDefault(require("../models/Doctor"));
const User_1 = __importDefault(require("../models/User"));
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor_1.default.find().populate('user', 'name email');
        res.json(doctors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllDoctors = getAllDoctors;
const getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor_1.default.findById(req.params.id).populate('user', 'name email');
        if (!doctor)
            return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getDoctor = getDoctor;
const createDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization, phone, hospitalName } = req.body;
        // Check if doctor with email already exists
        const existingDoctor = await Doctor_1.default.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor with this email already exists' });
        }
        // Check if user with email already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // Create User account for doctor
        const user = await User_1.default.create({
            name,
            email,
            password: password || 'doctor123', // Default password if not provided
            role: 'doctor',
        });
        // Create Doctor profile
        const doctor = await Doctor_1.default.create({
            name,
            email,
            specialization,
            phone,
            hospitalName,
            user: user._id,
        });
        res.status(201).json({
            ...doctor.toObject(),
            password: password || 'doctor123', // Return password for admin to share
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createDoctor = createDoctor;
const updateDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization, phone, hospitalName } = req.body;
        const doctor = await Doctor_1.default.findById(req.params.id);
        if (!doctor)
            return res.status(404).json({ message: 'Doctor not found' });
        // Update doctor fields
        doctor.name = name || doctor.name;
        doctor.specialization = specialization || doctor.specialization;
        doctor.phone = phone || doctor.phone;
        doctor.hospitalName = hospitalName || doctor.hospitalName;
        // Update email if changed
        if (email && email !== doctor.email) {
            const existingDoctor = await Doctor_1.default.findOne({ email });
            if (existingDoctor && existingDoctor._id.toString() !== req.params.id) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            doctor.email = email;
        }
        await doctor.save();
        // Update user account if exists
        if (doctor.user) {
            const user = await User_1.default.findById(doctor.user);
            if (user) {
                user.name = doctor.name;
                if (email)
                    user.email = email;
                if (password)
                    user.password = password; // Will be hashed by pre-save hook
                await user.save();
            }
        }
        res.json(doctor);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateDoctor = updateDoctor;
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor_1.default.findById(req.params.id);
        if (!doctor)
            return res.status(404).json({ message: 'Doctor not found' });
        // Delete associated user account
        if (doctor.user) {
            await User_1.default.findByIdAndDelete(doctor.user);
        }
        await Doctor_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Doctor deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteDoctor = deleteDoctor;
const getDoctorsByHospital = async (req, res) => {
    try {
        const doctors = await Doctor_1.default.find({ hospitalName: req.params.hospitalName });
        res.json(doctors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getDoctorsByHospital = getDoctorsByHospital;
