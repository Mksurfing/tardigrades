const { KronosLabs } = require("kronoslabs");
require('dotenv').config({ path: './.gitignore/config/.env', debug: true });

// Assign environment variables to JS variables
const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;

// Log them
console.log("API Key:", apiKey);
console.log("Running on port:", port);