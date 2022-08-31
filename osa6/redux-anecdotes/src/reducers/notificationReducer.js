import { createSlice } from '@reduxjs/toolkit'
let timeout = null
const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
      addNotification(state, action) {
        const notification = action.payload
        state = notification
        return state
      }
    }
  })

export const { addNotification } = notificationSlice.actions

export const setNotification = (text, seconds) => {
  return async dispatch => {
    dispatch(addNotification(text))
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {dispatch(addNotification(''))}, seconds * 1000)
  }
}

export default notificationSlice.reducer
  