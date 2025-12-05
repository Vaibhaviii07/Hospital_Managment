import mongoose from 'mongoose';

interface PrescriptionItem {
  medicine: mongoose.Schema.Types.ObjectId;
  dosage: string;
  duration: string;
  notes?: string;
}

interface IPatient extends mongoose.Document {
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  doctor: mongoose.Schema.Types.ObjectId;
  complaint: string;
  registrationDate: Date;
  prescription?: {
    items?: PrescriptionItem[];
    issuedAt?: Date;
  };
}

const prescriptionItemSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  dosage: { type: String, required: true },
  duration: { type: String, required: true },
  notes: { type: String },
}, { _id: false });

const patientSchema = new mongoose.Schema<IPatient>({
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  address: { type: String },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  complaint: { type: String },
  registrationDate: { type: Date, default: Date.now },
  prescription: {
    items: [prescriptionItemSchema],
    issuedAt: { type: Date },
  },
}, { timestamps: true });

export default mongoose.model<IPatient>('Patient', patientSchema);
