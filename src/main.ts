import express from 'express';
import 'dotenv/config';
import { sequelize } from '#database/database.config.js';
import { appRouter } from '#app.route.js';
import { errorMiddleware } from '#middleware/error.middleware.js';

const app = express();
const port = process.env.PORT ?? '8000';
app.use(express.json()); 

app.use('/api/v1', appRouter);
app.use(errorMiddleware);

app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server is running on port ${port}`);
});
