import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/', async (req, res) => {
    const { namePrefix, countryIds } = req.query

    try {
        const params = {
            namePrefix,
            limit: 10
        }
        
        // Add country filter if provided
        if (countryIds) {
            params.countryIds = countryIds
        }
        
        const response = await axios.get(
            'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
            {
                params,
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
                }
            }
        )

        const cities = response.data.data.map(city => ({
            id: city.id,
            name: city.name,
            country: city.countryCode
        }))

        res.json(cities)
    } catch (err) {
        console.error(err.response?.data || err.message)
        res.status(500).json({ error: 'Erreur lors de la récupération des villes' })
    }
})

export default router
