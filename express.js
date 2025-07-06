import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/routers.js';
import logger from './middleWare/logger.js'
import errorHandler from './middleWare/errorHandler.js';
import notFound from './middleWare/notFound.js';

// Set up __dirname for ES modules, which is not available by default.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// --- Global Middleware ---

// Middleware to parse incoming requests with JSON payloads.
app.use(express.json());
// Custom logger middleware to log request details to the console.
app.use(logger);
// Middleware to parse incoming requests with URL-encoded payloads.
app.use (express.urlencoded({extended: false}));
// Middleware to serve static files (like HTML, CSS, images) from the 'public' directory.
app.use(express.static(path.join(__dirname,'public')));
// Mount the user router for all routes starting with /api/users.
app.use('/api/users',router);

// --- Error Handling Middleware ---
// NOTE: Error handlers must be the LAST middleware added to the app.
app.use(notFound); // Catches requests that don't match any routes and creates a 404 error.
app.use(errorHandler); // Catches all errors passed from other middleware and sends a response.

// Start the server
app.listen(port, () => console.log(`✅ Backend running on http://localhost:${port}`));