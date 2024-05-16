import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { calculator } from './calculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: "Parameters are missing" });
  }
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: "Malformatted parameters" });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.status(200).json({
    weight: weight,
    height: height,
    bmi: bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const dailyExerciseHours: Array<number> = req.body.dailyExerciseHours;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const targetExerciseHours: number = req.body.target; 

  if (!dailyExerciseHours || !targetExerciseHours) {
    return res.status(400).json({ error: "Parameters missing" });
  }
  if (!Array.isArray(dailyExerciseHours) || isNaN(Number(targetExerciseHours))) {
    return res.status(400).json({ error: "Malformatted parameters" });
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = calculateExercises(dailyExerciseHours, targetExerciseHours);
  return res.status(200).json(result);
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: '...'});
  }

  if ( !value2 || isNaN(Number(value2))) {
    return res.status(400).send({ error: '...'});
  }

  if ( !op ) {
    return res.status(400).send({ error: '...'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(Number(value1), Number(value2), op);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});