import React, { useState } from 'react'
import { authenticateUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const labelStyle =
    'ml-4 -mt-10 text-xs text-blue-400 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-mt-8 peer-placeholder-shown:text-base duration-300 uppercase'
  const inputStyle =
    'px-4 py-2 w-full border border-slate-600 placeholder-transparent'
  const buttonStyle =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-10 uppercase w-full'

  const handleLogin = async (event) => {
    event.preventDefault()
    props.authenticateUser({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div className="mb-4">
      <h2 className="text-3xl font-bold mb-4 uppercase text-blue-500 text-center">
        login in to application
      </h2>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col items-start mb-9">
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            value={username}
            className={inputStyle}
          />
          <label htmlFor="username" className={labelStyle}>
            username
          </label>
        </div>

        <div className="flex flex-col items-start mb-9">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className={inputStyle}
          />
          <label htmlFor="password" className={labelStyle}>
            password
          </label>
        </div>
        <button className={buttonStyle} id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default connect(null, { authenticateUser, setNotification })(LoginForm)
