import userService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const userByBlogs = createSlice({
  name: 'userbyblogs',
  initialState: {},
  reducers: {
    setUserByBlogs(state, action) {
      return action.payload
    },
  },
})

export const { setUserByBlogs } = userByBlogs.actions

export const initializeUserByBlogs = (id) => {
  return async (dispatch) => {
    const user = await userService.getUserByBlogs(id)
    dispatch(setUserByBlogs(user))
  }
}

export default userByBlogs.reducer
