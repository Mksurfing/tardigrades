const { KronosLabs } = require("kronoslabs");
require('dotenv').config({ path: './.gitignore/config/.env', debug: true });

// Assign environment variables to JS variables
const ApiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;

const client = new KronosLabs({apiKey: ApiKey})