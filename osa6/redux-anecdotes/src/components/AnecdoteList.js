import { useDispatch, useSelector } from 'react-redux'
import { createVote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter) 
  const sortedfilteredAnecdotes = Object.values(anecdotes)
    .sort((a, b) => b.votes - a.votes)
    .filter( c => c.content.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {sortedfilteredAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(createVote(anecdote.id, anecdote))
            dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
            }
          }
        />
      ))}
    </>
  )
}

export default AnecdoteList
