import { validateDto } from "#middleware/validateDto.middleware.js";
import { Router } from "express";
import { AuthDto } from "./dtos/auth.dto";
import { AuthController } from "./controllers/auth.controller";
import { UserRepository } from "./repository/user.repository";
import { AuthService } from "./services/auth.service";
import asyncHandler from "express-async-handler";

export const authRouter = Router()
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post('/users', validateDto(AuthDto), asyncHandler(async (req, res) => {
    await authController.register(req, res);
}));

authRouter.post('/sessions', asyncHandler(async (req, res) => {
    await authController.login(req, res);
}));
