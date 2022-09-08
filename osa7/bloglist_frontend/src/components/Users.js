import React from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  return (
    <div className="w-full rounded-lg shadow mt-3">
      {user === null || Object.keys(user).length === 0 ? null : (
        <div>
          <h2 className="text-3xl font-bold mb-4 uppercase text-blue-500 text-left">
            Users
          </h2>

          <table className="table-fixed">
            <thead>
              <tr>
                <th></th>
                <th className="pl-10 uppercase text-blue-500">Blogs Created</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <Link
                        className="text-blue-600 hover:underline no-underline"
                        to={`/users/${user.id}`}
                      >
                        {user.username}
                      </Link>
                    </td>
                    <td className="pl-10">{user.blogs.length}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Users
