interface ResultObj {
   periodLength: number;
   trainingDays: number;
   success: boolean;
   rating: number | undefined;
   ratingDescription: string | undefined;
   target: number;

   average: number;
}

interface InputArgs {
   dailyExerciseHours: number[];
   targetExerciseHours: number;
}

const parseArgs = (args: Array<string>): InputArgs => {
   if (args.length < 4) throw new Error('Not enough arguments');

   const targetExerciseHours = Number(args[2]);
   const dailyExerciseHours = args.slice(3).map(hours => Number(hours));
   const isNanHelper = dailyExerciseHours.some(hours => isNaN(hours));

   if (!isNaN(targetExerciseHours) && !isNanHelper) {
     return {
       dailyExerciseHours,
       targetExerciseHours
     };
   } else {
     throw new Error('Provided values were not numbers!');
   }
};

export const calculateExercises = (dailyExerciseHours: Array<number>, targetExerciseHours: number) : ResultObj => {
   const totalExerciseHours = dailyExerciseHours.reduce((a, b) => {
    return a + b;
   }, 0);
   
   const periodLength = dailyExerciseHours.length;
   const trainingDays = dailyExerciseHours.filter(day => day > 0).length;
   let rating = undefined;
   let ratingDescription = undefined;
   const average = totalExerciseHours / periodLength;
   const success = average >= targetExerciseHours ? true : false;
   
   if (average < targetExerciseHours) {
      rating = 1;
      ratingDescription = 'Target not reached. You need to be more active in the future.';
   } else if (average >= targetExerciseHours && average - targetExerciseHours < 0.5) {
      rating = 2;
      ratingDescription = 'Target reached. Not too bad but could be better.';
   } else if (average > targetExerciseHours && (average - targetExerciseHours) >= 0.5) {
      rating = 3;
      ratingDescription = 'Target reached. Keep up the good work!';
   }

   return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success, 
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetExerciseHours,
    average: average
   };
};

try {
    const { dailyExerciseHours, targetExerciseHours } = parseArgs(process.argv);
    console.log('RESULT', calculateExercises(dailyExerciseHours, targetExerciseHours));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}