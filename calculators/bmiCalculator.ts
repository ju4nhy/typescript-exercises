interface BMIvalues {
    height: number;
    weight: number;
}

type Result = string | undefined;

const parseArguments = (args: Array<string>): BMIvalues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (a: number, b: number) : Result => {
  const bmi = (b / Math.pow( (a / 100), 2));

  if (bmi < 16.0 ) {
      return 'Underweight (Severe thinness)';
  } else if (bmi <= 16.9) {
      return 'Underweight (Moderate thinness)';
  } else if (bmi <= 18.4) {
      return 'Underweight (Mild thinness)';
  } else if (bmi <= 24.9) {
      return 'Normal range (healthy weight)';
  } else if (bmi <= 29.9) {
      return 'Overweight (Pre-obese)';
  } else if (bmi <= 34.9) {
      return 'Obese (Class 1)';
  } else if (bmi <= 39.9) {
      return 'Obese (Class 2)';
  } else if (bmi >= 40.0) {
      return 'Obese (Class 3)';
  }
  return undefined;
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}