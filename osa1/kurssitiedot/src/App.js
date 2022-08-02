const Header = ({course}) => {
  return course && (
    <h3>{course}</h3>
  )
}
const Part = ({part}) => {
  return part && ( 
     <p>{part.name} {part.exercises}</p>
  )
}
const Content = ({parts}) => {
  return parts && (
    <div>
      { 
        parts.map((p, index)=> (
          <Part part={p}/>
      ))}
    </div>
    );
}
const Total = ({parts})=> {
  const sum = parts.reduce(
    function (a, c) {return a + c.exercises}, 0)
  return (
    <div> 
      {sum} excerice(s)
    </div>
  )
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} /> 
      <Total parts={course.parts}/>
    </div>
  );
}

export default App;
