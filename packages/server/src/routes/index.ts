import { Express } from 'express-serve-static-core';
import { chatRouter } from './chat';

export const setRoutes = (app: Express) => {
    // Root route handler
    app.get('/', (req, res) => {
        res.send('Welcome to the Express TypeScript Server Root!');
    });

    // API routes
    chatRouter(app)

    // Handle 404 - Keep this as the last route
    app.use((req, res) => {
        res.status(404).send('Not Found');
    });
};