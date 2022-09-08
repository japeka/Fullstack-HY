import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blogDetailSlice = createSlice({
  name: 'blogdetail',
  initialState: {},
  reducers: {
    setBlogDetail(state, action) {
      return action.payload
    },
  },
})

export const { setBlogDetail } = blogDetailSlice.actions

export const initializeBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getOne(id)
    dispatch(setBlogDetail(blog))
  }
}

export default blogDetailSlice.reducer
