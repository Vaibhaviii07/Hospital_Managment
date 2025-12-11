import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

async function seedAdmin() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL || 'vaibhavitingane@gmail.com';
    const password = process.env.ADMIN_PASSWORD || 'Vaibhavi@07';
    const name = process.env.ADMIN_NAME || 'Super Admin';

    const existingAdmin = await User.findOne({ email, role: 'admin' });
    if (existingAdmin) {
      console.log('✔ Admin already exists:', email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    console.log(' Admin Created Successfully!');
   
    console.log('Email:', email);
    console.log('Password:', password);
  

    process.exit(0);
  } catch (error) {
    console.error(' Admin Seeding Failed:', error);
    process.exit(1);
  }
}

seedAdmin();
