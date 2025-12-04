import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string, role: 'admin' | 'doctor') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || '', { expiresIn: '30d' });
};

export const registerAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Admin already exists' });

  const user = await User.create({ name, email, password, role: 'admin' });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  console.log("Request body:", req.body);

  const user = await User.findOne({ email: email.trim() });
  console.log("Found user:", user);

  if (!user) {
    console.log("User not found");
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.matchPassword(password);
  console.log("Password match:", isMatch);

  if (!isMatch) {
    console.log("Password does not match");
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
};

export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json(user);
};
