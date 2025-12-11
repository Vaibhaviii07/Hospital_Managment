import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "doctor"], default: "doctor" },
    specialization: { type: String }, // Only for doctors
    phone: { type: String },
    hospital: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
