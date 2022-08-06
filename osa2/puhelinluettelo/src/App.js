import { useState,useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [notification, setNotification] = useState(null)

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
            setNotification(
              {
                 mode: 'success',
                 message: `Updated ${foundPerson.name}'s phone number` 
              }
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)            
        }).catch(error =>{
          setNotification(
            {
               mode: 'error',
               message: `Information of ${foundPerson.name} has already been removed from server` 
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)            
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
          setNotification(
            {
               mode: 'success',
               message: `Added ${newName}` 
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)            
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
              setNotification(
                {
                   mode: 'success',
                   message: `Deleted ${person.name}` 
                }
              )
              setTimeout(() => {
                setNotification(null)
              }, 5000)            
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
      <Notification notification={notification}/>
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
