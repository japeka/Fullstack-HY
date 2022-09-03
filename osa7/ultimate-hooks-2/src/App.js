import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event,arg) => {
    if(!arg) setValue(event.target.value)
    else reset()
  }

  const reset = () => setValue('')

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [url] = useState(baseUrl)

  useEffect(() => {
    if(!baseUrl) return 
    axios
    .get(baseUrl)
    .then(response => { 
      setResources(response.data)
    })
    .catch(error => console.log('Error: ', error.message))
  }, [baseUrl])

  const create = async (resource) => {
    const response = await axios.post(url, resource)
    setResources([...resources, response.data])
    return response.data
  }
  const service = {create}
  return [resources, service]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    if(!content.value) return
    noteService.create({ content: content.value })
    content.onChange(null, 'reset')
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    if(!name.value || !number.value) return
    personService.create({ name: name.value, number: number.value})
    name.onChange(null, 'reset')
    number.onChange(null, 'reset')
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App