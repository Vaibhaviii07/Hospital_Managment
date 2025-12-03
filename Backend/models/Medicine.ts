import mongoose from 'mongoose';

interface IMedicine extends mongoose.Document {
  name: string;
  genericName: string;
  strength: string;
  type: 'Tablet' | 'Syrup' | 'Injection';
  company: string;
}

const medicineSchema = new mongoose.Schema<IMedicine>({
  name: { type: String, required: true },
  genericName: { type: String, required: true },
  strength: { type: String },
  type: { type: String, enum: ['Tablet','Syrup','Injection'], required: true },
  company: { type: String },
}, { timestamps: true });

export default mongoose.model<IMedicine>('Medicine', medicineSchema);
