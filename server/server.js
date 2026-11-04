import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = (
  process.env.CORS_ORIGIN ??
  'http://localhost:5173,http://localhost:5174,http://localhost:5175'
)
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
