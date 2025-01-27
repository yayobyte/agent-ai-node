import { Router, Express, response } from "express";
import { getCompletion } from "../packages/openai";
import { cityExtractor } from "../packages/weatherHelper";

const router = Router();

export const chatRouter = (app: Express) => {
    app.use('/api', router);

    router.post('/chat', async (req, res) => {
        // Get params from request body
        const { userPrompt } = req.body;
        const city = cityExtractor(userPrompt);
        if (!city) {
            res.status(200).send({ response: ['I have no training to get information from that city'] });
            return;
        }

        try {
            const response = await getCompletion(city || 'ABU_DABI', userPrompt)
            res.status(200).send({ response });
            
        } catch (error) {
            console.error(error);
            res.status(200).send({ response: 'An error occurred' });
        }
    });
}