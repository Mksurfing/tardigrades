// Minimal backend with Express
import express from "express";
import cors from "cors";
import { KronosLabs, KronosLabsError } from "kronoslabs";

const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

// Initialize KronosLabs
const client = new KronosLabs({ apiKey: "YOUR_API_KEY_HERE" });

// Endpoint to get AI fitness plan
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

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});