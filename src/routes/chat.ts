import { Router, Express } from "express";
import { getCompletion } from "../packages/openai";
import { City, getWeather } from "../packages/weatherHelper";

const router = Router();

export const chatRouter = (app: Express) => {
    app.use('/api', router);

    router.get('/chat', async (req, res) => {
        const city = req.query.city as City;
        const weatherInfo = getWeather(city)

        if (!city) {
            res.status(400).send('City parameter is required');
            return;
        }
        
        try {
            const completion = await getCompletion(city)
            const response = completion.choices[0].message.content
            res.status(200).send({ city, weatherInfo, response});
            
        } catch (error) {
            console.error(error);
            res
                .status(error instanceof Error && 'status' in error ? (error as any).status : 500)
                .send(error instanceof Error ? error.message : 'An unknown error occurred');
        }
        
    });
}