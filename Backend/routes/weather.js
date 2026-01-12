import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
    const { city, country } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;


    try {
        const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather',
            {
                params: {
                    q: `${city},${country}`,
                    units: 'metric',
                    appid: apiKey,
                },
            }
        );

        const data = response.data;

        res.json({
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            condition: data.weather[0].description,
        });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res
            .status(500)
            .json({ error: 'Erreur lors de la récupération des données météo.' });
    }
});

export default router;
