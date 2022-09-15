// interface MultiplyValues {
//   value1: number;
//   value2: number;
// }

// const parseArguments = (args: Array<string>): MultiplyValues => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   if (args.length > 4) throw new Error("Too many arguments");

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       value1: Number(args[2]),
//       value2: Number(args[3]),
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

// const calculateBmi = (height: number, weight: number): string => {
//   const bmi = (weight / ((height * height) / 100)) * 100;
//   if (bmi >= 18.5 && bmi <= 24.9) return "Normal weight";
//   return "Not within normal weight";
// };

interface Result {
  weight: number;
  height: number;
  bmi: string;
}

const calculateBmi = (height: number, weight: number): Result => {
  const bmi = (weight / ((height * height) / 100)) * 100;
  const res: Result = {
    weight,
    height,
    bmi:
      bmi >= 18.5 && bmi <= 24.9
        ? "Normal (healthy weight)"
        : "Not within normal weight",
  };
  return res;
};

export default calculateBmi;

// try {
//   const { value1, value2 } = parseArguments(process.argv);
//   console.log(calculateBmi(value1, value2));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
