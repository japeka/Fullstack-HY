import React from 'react'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import LoginForm from './LoginForm'

const UserForm = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      {user === null || Object.keys(user).length === 0 ? (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      ) : null}
    </div>
  )
}

export default UserForm
