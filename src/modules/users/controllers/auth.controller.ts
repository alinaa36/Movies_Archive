import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { AuthDto } from '../dtos/auth.dto';
import asyncHandler from 'express-async-handler';

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const register = asyncHandler(async (req: Request, res: Response) => {
  const data: AuthDto = req.body;

  const existingUser = await User.findOne({ where: { email: data.email } });
  if (existingUser) {
    res.status(400).json({ message: 'Email already used' });
    return;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  res.status(201).json({
    message: 'User registered successfully',
    userId: user.id,
    email: user.email,
  });
});

const login = asyncHandler(async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(401).json({ message: 'Authentication Failed' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: 'Authentication Failed' });
    return;
  }

  const token = jwt.sign(
    { email: user.email, userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  );

  res.status(200).json({
    accessToken: token,
    userId: user.id,
  });
});

export { register, login };
