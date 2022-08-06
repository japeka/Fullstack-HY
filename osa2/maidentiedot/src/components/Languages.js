const Languages = ({languages}) => {
    return (
       <ul>
            {Object.values(languages).map( l =>(<li key={l}>{l}</li>))}
       </ul>
    )
}
export default Languages