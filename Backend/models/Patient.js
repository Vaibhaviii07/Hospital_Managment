// models/Patient.js
import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    complaint: String,
    phone: String,
    address: String,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true } // important for filtering today's patients
);

export default mongoose.model("Patient", PatientSchema);
