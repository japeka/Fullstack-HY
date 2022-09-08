import React from 'react'
import { useSelector } from 'react-redux'

const UserByBlogs = () => {
  const user = useSelector((state) => state.user)
  const userByBlogs = useSelector((state) => state.usersbyblogs)
  return (
    <>
      {user === null ? null : (
        <div>
          <h2 className="text-3xl font-bold mb-4 uppercase text-orange-500 text-left">
            {userByBlogs && userByBlogs.name}
          </h2>
          <h3 className="text-2xl font-bold mb-4 uppercase text-blue-500 text-left">
            {userByBlogs && userByBlogs.blogs && userByBlogs.blogs.length === 0
              ? 'no blogs created'
              : 'added blogs'}
          </h3>
          <ul>
            {userByBlogs &&
              userByBlogs.blogs &&
              userByBlogs.blogs.length > 0 &&
              userByBlogs.blogs.map((ub) => (
                <li className="list-disc" key={ub.id}>
                  {ub.title}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default UserByBlogs
