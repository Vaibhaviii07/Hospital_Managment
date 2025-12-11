import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  medicines: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
      dosage: String,
      duration: String,
      notes: String,
    },
  ],
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Prescription", PrescriptionSchema);
