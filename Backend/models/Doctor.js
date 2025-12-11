import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String },
    phone: { type: String },
    hospital: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", DoctorSchema);
