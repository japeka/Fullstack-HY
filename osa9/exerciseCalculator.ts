interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

// const parseMultipleArguments = (args: string[]): number[] => {
//   if (args.length < 12) throw new Error("Not enough arguments");
//   if (args.length > 12) throw new Error("Too many arguments");
//   const numbers: number[] = [];
//   for (let i = 2; i < args.length; i++) {
//     if (!isNaN(Number(args[i]))) {
//       console.log(args[i]);
//       numbers.push(Number(args[i]));
//     } else {
//       throw new Error("Provided values were not numbers!");
//     }
//   }
//   return numbers;
// };
//const valid = validateArguments(daily_exercises, target);

interface Body {
  daily_exercises: string[];
  target: string;
}

interface ValidResponse {
  valid: true | false;
  error: string;
  numbers: number[];
}

const validateArguments = (
  daily_exercises: string[],
  target: string
): ValidResponse => {
  if (!target || !daily_exercises || daily_exercises.length !== 7) {
    const response: ValidResponse = {
      valid: false,
      error: "parameters missing",
      numbers: [],
    };
    return response;
  } else {
    const numbers: number[] = [];
    for (let i = 0; i < daily_exercises.length; i++) {
      if (!Number(daily_exercises[i])) {
        if (Number(daily_exercises[i]) == 0) {
          numbers.push(Number(daily_exercises[i]));
          continue;
        }
        const response: ValidResponse = {
          valid: false,
          error: "malformatted parameters",
          numbers: [],
        };
        return response;
      } else {
        numbers.push(Number(daily_exercises[i]));
      }
    }
    const response: ValidResponse = {
      valid: !Number(target) ? false : true,
      error: !Number(target) ? "malformatted parameters" : "",
      numbers: !Number(target) ? [] : numbers,
    };
    return response;
  }
};

const calculateExercises = (hours: number[], target: number): Result => {
  console.log(hours, target);
  const _average = hours.reduce((avg, value, _, { length }) => {
    return avg + value / length;
  }, 0);
  const _rating = _average > target ? 3 : target - _average < 0.2 ? 2 : 1;
  const result: Result = {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h !== 0).length,
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

// const calculateExercises = (hours: number[]): Result => {
//   const [target, ..._hours] = hours;
//   const _average = _hours.reduce((avg, value, _, { length }) => {
//     return avg + value / length;
//   }, 0);
//   const _rating = _average > target ? 3 : target - _average < 0.2 ? 2 : 1;
//   const result: Result = {
//     periodLength: _hours.length,
//     trainingDays: _hours.filter((h) => h !== 0).length,
//     average: _average,
//     target,
//     success: _average >= target,
//     rating: _rating,
//     ratingDescription:
//       _rating === 3
//         ? "well done"
//         : _rating === 2
//         ? "not too bad but could be better"
//         : "not so well done",
//   };
//   return result;
// };

export { calculateExercises, validateArguments, Body };

// try {
//   const args = parseMultipleArguments(process.argv);
//   console.log(calculateExercises(args));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
