import User from '../models/user_model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const COOKIE_OPTIONS = {
  httpOnly: false,      // Prevents JavaScript access
  secure:false, 
  sameSite: 'Lax',   // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days 
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password: hashedPassword
  });

  const token = jwt.sign(
    { ...user._doc },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // res.cookie('token', token, COOKIE_OPTIONS);
  res.status(201).json({ message: 'User registered successfully',token ,user});
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ ...user._doc }, process.env.JWT_SECRET,{ expiresIn: '7d' });

  // res.cookie('token', token, COOKIE_OPTIONS);
  res.status(200).json({ message: 'Login successful' ,token,user});
};
