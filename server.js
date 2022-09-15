import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'some other link'] }));

app.use('/', routes);

// database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('database connected successfully');
  })
  .catch((err) => console.log('error connecting to mongodb', err));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log('server is listening on port ' + PORT);
});
