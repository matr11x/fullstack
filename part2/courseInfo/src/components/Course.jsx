const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, obj) => {
    return accumulator + obj.exercises;
  }, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key = {part.id} part = {part}></Part>)}
    </div>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key = {course.id}>
        <Header course = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
        </div>
      ))}
    </div>
  )
}

export default Course