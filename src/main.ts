import express from 'express';
import 'dotenv/config';
import { sequelize } from '#database/database.config.js';
import router from '#modules/movie/movie.route.js';

const app = express();

const port = process.env.PORT ?? '3000';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json()); 

app.use('/movies', router);

app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server is running on port ${port}`);
});
