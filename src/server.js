import express from 'express';
import cors from 'cors';
import { runGame } from './game.js';

const app = express();
const PORT = 3000;

// Allow CORS for all origins
app.use(cors());

// Serve up static files 
app.use(express.static("./public"));

// Parse JSON bodies
app.use(express.json());

// Basic route to test the server
app.post('/chat', runGame);

// Start the server
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));