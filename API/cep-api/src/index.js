import express from 'express';
import dotenv from 'dotenv';
import cepRoutes from './routes/cepRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Middleware para as rotas
app.use('/api', cepRoutes);