import React from 'react'

const Persons = ({filteredPersons}) => {
  return (
    <ul>{filteredPersons.map( p =>(<li key={p.name}>{p.name} {'  '} {p.number} </li>))}</ul> 
  )
}

export default Persons