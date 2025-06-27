import { authRouter } from "#modules/auth/auth.route.js";
import router from "#modules/movie/movie.route.js";
import { Router } from "express";

export const appRouter = Router()

appRouter.use('/movies', router);
appRouter.use('/', authRouter);
