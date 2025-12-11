import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", MedicineSchema);
