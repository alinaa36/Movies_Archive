import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthDto } from '../dtos/auth.dto';
import { UserRepository } from '../repository/user.repository';
import { LoginRequest } from '../interfaces/auth.interface';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(data: AuthDto) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already used');
    }

    if (data.password != data.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const payload = { email: data.email };
    const token = this.generateToken(payload);

    const user = await this.userRepository.createUser({
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      email: user.email,
      accessToken: token,
    };
  }

  async login(data: LoginRequest) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
        throw new Error('Authentication Failed');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new Error('Authentication Failed');
    }

    const payload = { email: user.email, id: user.id };
    const token = this.generateToken(payload);

    return {
      message: 'Login successful',
      email: user.email,
      accessToken: token,
    };
  }

  private generateToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
  }
}
