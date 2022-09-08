import './App.css'

import {
  Route,
  useMatch,
  //Navigate,
  /*Link,*/ Routes /*useNavigate, useMatch*/,
} from 'react-router-dom'

import { useEffect } from 'react'

import Menu from './components/Menu'
import UserForm from './components/UserForm'
import Users from './components/Users'
import BlogList from './components/BlogList'
import UserByBlogs from './components/UserByBlogs'
import BlogDetail from './components/BlogDetail'

import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeBlog } from './reducers/blogDetailReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUserByBlogs } from './reducers/userByBlogReducer'

import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
    }
  }, [dispatch])

  const matchUserByBlog = useMatch('/users/:id')
  useEffect(() => {
    if (!matchUserByBlog) return
    dispatch(initializeUserByBlogs(matchUserByBlog.params.id))
  }, [matchUserByBlog])

  const matchBlogId = useMatch('/blogs/:id')
  useEffect(() => {
    if (!matchBlogId) return
    dispatch(initializeBlog(matchBlogId.params.id))
  }, [matchBlogId])

  return (
    <div>
      <Menu />

      <Notification />
      <UserForm />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserByBlogs />} />
      </Routes>
    </div>
  )
}

export default App
