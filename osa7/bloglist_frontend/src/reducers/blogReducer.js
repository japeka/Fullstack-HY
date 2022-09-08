import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blobSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const blog = action.payload
      return state.map((_blog) => (_blog.id !== blog.id ? _blog : blog))
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    dropBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    addComment(state, action) {
      const blog = action.payload
      return state.map((_blog) => (_blog.id !== blog.id ? _blog : blog))
    },
  },
})

export const { addLike, setBlogs, appendBlog, dropBlog, addComment } =
  blobSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(dropBlog(id))
  }
}

export const createLike = (id, blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(id, blog)
    dispatch(addLike(likedBlog))
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(addComment(updatedBlog))
  }
}

export default blobSlice.reducer
