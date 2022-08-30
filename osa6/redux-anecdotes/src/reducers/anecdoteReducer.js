import anecdoteService from  '../services/anecdotes'
import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const anecdote = action.payload
      return state.map((_anecdote) =>
        _anecdote.id !== anecdote.id ? _anecdote : anecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
export const { addVote,appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const createVote = (id, anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(id, anecdote)
    dispatch(addVote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer
