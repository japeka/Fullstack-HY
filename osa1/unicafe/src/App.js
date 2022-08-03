
import { useState } from 'react'

const StatisticLine = ({text,value}) =>(<tr><td>{text}</td><td>{value}</td></tr>)

const Statistics = ({good,neutral,bad}) => {
  const getLenAll = () => good + neutral + bad
  const getAverage = () => (good - bad)/getLenAll()
  const getPosPercentage = () => (good/getLenAll())*100
  return ( !good && !neutral && !bad ? <p>No feedback given</p>
    :
    <div>
      <h1>statistics</h1>
      <table><tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={getLenAll()}/>
        <StatisticLine text="average" value={getAverage()}/>
        <StatisticLine text="positive" value={`${getPosPercentage()} %`}/>
        </tbody>        
      </table>
    </div>
    )
};

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(5)
  const [neutral, setNeutral] = useState(2)
  const [bad, setBad] = useState(1)
  return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={()=>{}} text="good" />
        <Button handleClick={()=>{}} text="neutral" />
        <Button handleClick={()=>{}} text="bad" />
        <Statistics 
          good={good} 
          neutral={neutral} 
          bad={bad} 
          />
    </div>
  );
}

export default App;
