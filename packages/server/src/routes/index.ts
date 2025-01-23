import { Express } from 'express-serve-static-core';
import { chatRouter } from './chat';
import { getAllWeatherConditions } from '../packages/weatherHelper';

export const setRoutes = (app: Express) => {
    // Root route handler
    app.get('/', (req, res) => {
        const conditions = getAllWeatherConditions();
        const citiesList = conditions
            .map(condition => condition.city)
            .join(', ');
        res.json({ message: 'Hello, I am you weather AI Agent. I can tell you the weather in any city. Here are the conditions I can tell you about: ' + citiesList });
    });

    // API routes
    chatRouter(app)

    // Handle 404 - Keep this as the last route
    app.use((req, res) => {
        res.status(404).send('Not Found');
    });
};