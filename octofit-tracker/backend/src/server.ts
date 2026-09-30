import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    response.status(400).json({ error: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

await connectDatabase();
app.listen(port, () => console.log(`OctoFit API listening on port ${port}`));