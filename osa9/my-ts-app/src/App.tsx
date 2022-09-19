import React from "react";

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: "normal";
}

interface CourseNormalSpecial extends CoursePartWithDescription {
  type: "special";
  requirements: string[];
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseNormalSpecial;

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  return (
    part && <li>{Object.values(part).map((po) => `--${po.join(",")}`)}</li>
  );
};

const Header = ({ name }: { name: string }): JSX.Element => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <ul>
      {parts.map((p, i) => (
        <Part key={i} part={p} />
      ))}
    </ul>
  );
};

const Total = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

const App = (): JSX.Element => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];
  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
