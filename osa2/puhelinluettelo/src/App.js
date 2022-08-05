import { useState } from 'react'

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addPerson = (event) => { 
    event.preventDefault();
    if(
      !newName.trim().length || 
      !newNumber.trim().length) 
        return alert(`Enter name and phone please`);
    
    const result = persons.filter(p => p.name === newName);
    if(result.length) 
      return alert(`${newName} is already added to phonebook`);
    
    setPersons([...persons, {
                name: newName,
                number: newNumber
    }]);
    setNewName('');
    setNewNumber('');
  }

  const filteredPersons = searchTerm.length 
      ? persons.filter(p => p.name.toLowerCase().startsWith(searchTerm.toLocaleLowerCase())) 
      : persons;

  return (
    <div>
      <h1>phonebook</h1>
      <Filter 
        searchTerm={searchTerm} 
        handleChangeEvent={(e)=>{setSearchTerm(e.target.value)}} />       
      
      <h2>add a new</h2>    
      <PersonForm 
        newName={newName}
        handleChangeEventForName={(e)=>setNewName(e.target.value)}
        newNumber={newNumber}
        handleChangeEventForNumber={(e)=>setNewNumber(e.target.value)}
        handleSubmitEvent={addPerson}
      />

      <h2>numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
  </div>);
}
export default App;
