import React from 'react'

const PersonForm = ({newName, handleChangeEventForName, newNumber,handleChangeEventForNumber,handleSubmitEvent}) => {
  return (
    <form onSubmit={handleSubmitEvent}>
    <div>
      name: 
        <input 
          value={newName}
          onChange={handleChangeEventForName}/>
    </div>
    <div>number: 
        <input 
          value={newNumber}
          onChange={handleChangeEventForNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
export default PersonForm