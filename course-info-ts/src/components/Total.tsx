import { CoursePartBase } from '../../src/types';

const Total = ({ courseParts }: { courseParts: CoursePartBase[] }) => (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
   </p>
);

export default Total