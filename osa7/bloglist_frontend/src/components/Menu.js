import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoggedUser from './LoggedUser'
const Menu = () => {
  const user = useSelector((state) => state.user)
  const _user =
    user === null ? null : Object.keys(user).length === 0 ? null : user
  return (
    <nav className="mt-5 bg-gray-200 p-2">
      <Link className="mr-5 hover:underline uppercase text-2xl" to="/blogs">
        blogs
      </Link>
      <Link className="mr-5 hover:underline uppercase text-2xl" to="/users">
        users
      </Link>
      {_user && <LoggedUser />}
    </nav>
  )
}

export default Menu
