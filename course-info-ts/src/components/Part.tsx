import { CoursePart } from '../../src/types';
import { assertNever } from '../../src/utils';

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
        case "normal":
            return <div>
                      <strong>{part.name} {part.exerciseCount}</strong>
                      <p><i>{part.description}</i></p>
                  </div>;
        case "groupProject":
            return <div>
                      <strong>{part.name} {part.exerciseCount}</strong>
                      <p>Project exercises: {part.groupProjectCount}</p>
                  </div>;
        case "submission":
            return <div>
                      <strong>{part.name} {part.exerciseCount}</strong>
                      <p><i>{part.description}</i></p>
                      <p>Submit to {part.exerciseSubmissionLink}</p>
                  </div>;
        case "special":
            return <div>
                      <strong>{part.name} {part.exerciseCount}</strong>
                      <p><i>{part.description}</i></p>
                      <p>Required skills: {part.requirements.join(", ")}</p>
                  </div>;
        default:
            assertNever(part);
            return null;
    }
};

export default Part