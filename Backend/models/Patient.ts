import mongoose from 'mongoose';

interface IPatient extends mongoose.Document {
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  doctor: mongoose.Schema.Types.ObjectId;
  complaint: string;
  registrationDate: Date;
}

const patientSchema = new mongoose.Schema<IPatient>({
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  address: { type: String },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  complaint: { type: String },
  registrationDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IPatient>('Patient', patientSchema);
