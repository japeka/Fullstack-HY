import express from "express";
import bodyParser from "body-parser";
import calculateBmi from "./bmiCalculator";
import {
  calculateExercises,
  validateArguments,
  Body,
} from "./exerciseCalculator";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/bmi", (_req, res) => {
  const { height, weight } = _req.query;
  if (!height || !weight || !Number(height) || !Number(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  } else {
    const result = calculateBmi(Number(height), Number(weight));
    return res.status(200).json(result);
  }
});

app.post("/daily", (req, res) => {
  const { daily_exercises, target } = req.body as Body;
  const rule = validateArguments(daily_exercises, target);
  if (rule.valid) {
    const response = calculateExercises(rule.numbers, Number(target));
    return res.status(200).json(response);
  } else {
    return res.status(400).json({ error: rule.error });
  }
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
