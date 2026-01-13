import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weather from './routes/weather.js';
import cities from './routes/cities.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - permet les requêtes depuis localhost et Netlify
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://*.netlify.app',
    /\.netlify\.app$/
  ],
  credentials: true
}));

app.use(express.json());
app.use('/api/weather', weather);
app.use('/api/cities', cities);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});