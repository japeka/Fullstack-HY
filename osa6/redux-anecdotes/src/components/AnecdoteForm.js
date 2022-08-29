import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    
    const addAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(createAnecdote(content))
      dispatch(setNotification(`You created new anecdote '${content}'`))
      setTimeout(() => {dispatch(setNotification(''))}, 5000)      
    }

    return (
     <>
      <h2>create new</h2>  
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button>create</button>
      </form>
      </>
    )
}
  
export default AnecdoteForm