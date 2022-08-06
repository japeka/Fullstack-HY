import { useState,useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons  => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => { 
    event.preventDefault();
    if(
      !newName.trim().length || !newNumber.trim().length)
        return alert(`Enter name and phone please`);
    
    const result = persons.filter(p => p.name === newName);
    if(result.length) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const foundPerson = result[0];
        const changedPerson = { ...foundPerson, number: newNumber }
        return personService.
         update(foundPerson.id, changedPerson)
          .then( p  => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : p))
            setNewName('');
            setNewNumber('')
        })
      }
    }
    
    const newPerson = {
      name: newName,
      number: newNumber
    };
    personService.
      create(newPerson)
        .then( person  => {
          setPersons([...persons, person])
          setNewName('');
          setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if(person) {
      console.log(person);
      if (window.confirm(`Delete ${person.name}`)) {
        personService.
          deletePerson(person.id)
            .then( per  => {
              const newPersons = persons.filter(p => p.id !== person.id)
              setPersons(newPersons)  
        })
      }
    }
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
      <Persons filteredPersons={filteredPersons} handleDeleteEvent={deletePerson}/>
  </div>);
}
export default App;
