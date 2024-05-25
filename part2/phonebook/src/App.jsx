import { useEffect, useState, userEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './App.css'

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
        filter shown with: 
          <input
            value = {newFilter}
            onChange = {handleFilterChange}
          />
      </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit = {addPerson}>
        <div>
          name: 
            <input 
              value = {newName}
              onChange = {handleNameChange}
            />
        </div>
        <div>number:
           <input 
            value = {newNumber}
            onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={handleDelete}> delete</button>
    </li>
  )
}

const Persons = ({ contactsToShow, handleDeleteOf }) => {
  return (
    <div>
      <ul>
        {contactsToShow.map((person) => (
          <Person 
            key = {person.id} 
            person = {person}
            handleDelete = {() => handleDeleteOf(person.id)}
          />
        ))}
      </ul>
    </div>
  )
}

const Noti = ({ message }) => {
  if (message === null) return null

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (nameInArray(newName, persons)) {
      alert(`${newName} is already added to the phonebook`)
    }
     
    else {
      const contactObj = {name: newName, number: newNumber}

      personService
        .create(contactObj)
        .then(returntedPerson => {
          setPersons(persons.concat(returntedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`added ${newName}`);
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const nameInArray = (name, array ) => {
    return array.some(person => person.name === name);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDeleteOf = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(`The contact '${person.name}' was already deleted from the server`)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const contactsToShow = newFilter.length === 0 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Noti message = {notification}></Noti>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}></Filter>

      <h2>Add a New Contact</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} 
        newNumber = {newNumber} handleNumberChange = {handleNumberChange}></PersonForm>
      
      <h2>Names</h2>
      <Persons contactsToShow = {contactsToShow} handleDeleteOf = {handleDeleteOf}></Persons>

    </div>
  )
}

export default App