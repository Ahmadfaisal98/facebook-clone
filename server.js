import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

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
  console.log('Server is listening on port ' + PORT);
});
