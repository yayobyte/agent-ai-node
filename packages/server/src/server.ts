import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { setRoutes } from './routes/index';
import { errorHandler, logger } from './middleware/index';

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const PORT = process.env.PORT || 3000;

// Cors configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'exp://localhost:19000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger)

// Set up routes
setRoutes(app);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});