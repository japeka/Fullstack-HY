import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    addUser(state, action) {
      return action.payload
    },
    logout(state, action) {
      return action.payload
    },
  },
})

export const { addUser, logout } = userSlice.actions

export const initializeUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch(addUser(user))
  }
}

export const authenticateUser = (user) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      dispatch(addUser(loggedUser))
    } catch (exception) {
      dispatch(setNotification(['error', exception.response.data], 5))
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(logout(null))
  }
}

export default userSlice.reducer
