import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IDoctor extends Document {
  name: string;
  email: string;
  specialization: string;
  phone: string;
  hospitalName: string;
  password: string;
}

const doctorSchema: Schema<IDoctor> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialization: { type: String, required: true },
  phone: { type: String, required: true },
  hospitalName: { type: String, required: true },
  password: { type: String, required: true }, // ⬅ added password
});

// 🔒 Hash password before save
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Optional: method to check password
doctorSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IDoctor>("Doctor", doctorSchema);
