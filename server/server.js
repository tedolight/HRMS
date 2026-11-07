import 'dotenv/config';
import cors    from 'cors';
import express from 'express';
import helmet  from 'helmet';
import morgan  from 'morgan';
import { testConnection } from './src/config/db.js';

const app  = express();
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

// ── Health check ───────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

(async () => {
  await testConnection();             
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
