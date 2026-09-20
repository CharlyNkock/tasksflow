import express from 'express';
import { setupRoutes } from './routes';
import { initializeMiddleware } from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize middleware
initializeMiddleware(app);

// Setup routes
setupRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});