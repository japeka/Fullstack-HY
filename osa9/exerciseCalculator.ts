interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const parseMultipleArguments = (args: string[]): number[] => {
  if (args.length < 12) throw new Error("Not enough arguments");
  if (args.length > 12) throw new Error("Too many arguments");
  const numbers: number[] = [];
  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      console.log(args[i]);
      numbers.push(Number(args[i]));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }
  return numbers;
};

const calculateExercises = (hours: number[]): Result => {
  const [target, ..._hours] = hours;
  const _average = _hours.reduce((avg, value, _, { length }) => {
    return avg + value / length;
  }, 0);
  const _rating = _average > target ? 3 : target - _average < 0.2 ? 2 : 1;
  const result: Result = {
    periodLength: _hours.length,
    trainingDays: _hours.filter((h) => h !== 0).length,
    average: _average,
    target,
    success: _average >= target,
    rating: _rating,
    ratingDescription:
      _rating === 3
        ? "well done"
        : _rating === 2
        ? "not too bad but could be better"
        : "not so well done",
  };
  return result;
};

try {
  const args = parseMultipleArguments(process.argv);
  console.log(calculateExercises(args));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
