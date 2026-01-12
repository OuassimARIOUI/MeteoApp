import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weather from './routes/weather.js';
import cities from './routes/cities.js';
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/weather',weather);
app.use('/cities', cities)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})