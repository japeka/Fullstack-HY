import Header from './Header'
import Content from './Content/Content'

const Course = ({course}) => {
    const total = course.parts.reduce((a, c) => {return a + c.exercises}, 0)
    return course && (
     <>
      <Header name={course.name} />
      <Content parts={course.parts} />  
      <h3>total of {total} exercises</h3>
     </>
    )
  }
  export default Course
