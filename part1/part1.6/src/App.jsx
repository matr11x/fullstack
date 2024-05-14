import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <div> {props.text} {props.value} </div>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <div>
       <StatisticLine text = {"good"} value = {props.good}></StatisticLine>
       <StatisticLine text = {"neutral"} value = {props.neutral}></StatisticLine>
       <StatisticLine text = {"bad"} value = {props.bad}></StatisticLine>
       <StatisticLine text = {"all"} value = {props.good + props.neutral + props.bad}></StatisticLine>
       <StatisticLine text = {"average"} value = {(props.good - props.bad) / (props.good + props.neutral + props.bad)}></StatisticLine>
       <StatisticLine text = {"positive"} value = {props.good / (props.good + props.neutral + props.bad)}></StatisticLine>

    </div>
  )

  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>

      <Button onClick = {increaseGood} text = "good"></Button>
      <Button onClick = {increaseNeutral} text = "neutral"></Button>
      <Button onClick = {increaseBad} text = "bad"></Button>
      
      <h2>statistics</h2>

      <Statistics good = {good} neutral = {neutral} bad = {bad}></Statistics>
    </div>
  )
}

export default App