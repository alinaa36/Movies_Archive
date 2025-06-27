import { Request, Response } from 'express';
import { AuthDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response) {
    const data: AuthDto = req.body;
    const result = await this.authService.register(data);
    res.status(201).json(result);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.authService.login({ email, password });
    res.status(200).json(result);
  }
}
