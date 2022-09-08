import React from 'react'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const LoggedUser = (props) => {
  const user = useSelector((state) => state.user)
  return (
    <>
      <span className="p-2">{user && `${user.name} logged in`}</span>
      <button
        className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-10 mb-2 uppercase"
        onClick={() => {
          props.logoutUser()
        }}
      >
        logout
      </button>
    </>
  )
}

export default connect(null, { logoutUser })(LoggedUser)
