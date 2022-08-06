import React from 'react'
const Persons = ({filteredPersons, handleDeleteEvent}) => {
  return (
    <ul>{filteredPersons.map( p =>(
      <li key={p.name}>{p.name} {'  '} {p.number} { ' ' } 
      <button onClick={()=>handleDeleteEvent(p.id)}>delete</button></li>))}</ul> 
  )
}

export default Persons