import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import blogDetailReducer from './reducers/blogDetailReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import userByBlogReducer from './reducers/userByBlogReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    blogdetail: blogDetailReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
    usersbyblogs: userByBlogReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
