import mongoose from 'mongoose';

interface IDoctor extends mongoose.Document {
  name: string;
  email: string;
  specialization: string;
  phone: string;
  hospitalName: string;
}

const doctorSchema = new mongoose.Schema<IDoctor>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialization: { type: String, required: true },
  phone: { type: String },
  hospitalName: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IDoctor>('Doctor', doctorSchema);
