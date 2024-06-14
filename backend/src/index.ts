import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/user.routes';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
