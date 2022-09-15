import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.get("/bmi", (_req, res) => {
  const { height, weight } = _req.query;
  if (!height || !weight || !Number(height) || !Number(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  } else {
    const result = calculateBmi(Number(height), Number(weight));
    return res.status(200).json(result);
  }
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
