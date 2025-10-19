import express from "express";
import cors from "cors";
import { KronosLabs, KronosLabsError } from "kronoslabs";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: './.gitignore/config/.env', debug: true });

const ApiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;

if (!ApiKey) {
  console.error("API_KEY not found in environment variables!");
  process.exit(1); // Stop the server if no key
}

// Initialize KronosLabs client
const client = new KronosLabs({ apiKey: ApiKey });

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to generate AI fitness plan
app.post("/api/fitness", async (req, res) => {
  const { goal } = req.body;

  if (!goal || goal.trim() === "") {
    return res.status(400).json({ error: "Goal is required" });
  }

  try {
    const response = await client.chat.completions.create({
      prompt: `Create a detailed, personalized fitness plan based on the following goal: ${goal}`,
      model: "hyperion",
      temperature: 0.7,
      isStream: false,
    });

    const plan = response.choices[0].message.content;
    res.json({ plan });
  } catch (error) {
    if (error instanceof KronosLabsError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown server error" });
    }
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});