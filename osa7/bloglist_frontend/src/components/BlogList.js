import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createLike, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogsByLikes = Object.values(blogs).sort(
    (a, b) => b.likes - a.likes
  )
  return (
    <div className="w-full rounded-lg shadow mt-3">
      {user === null || Object.keys(user).length === 0 ? null : (
        <div>
          <h2 className="text-3xl font-bold mb-4 uppercase text-blue-500 text-left">
            blogs
          </h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>

          <ul className="divide-gray-100">
            {sortedBlogsByLikes.length > 0 ? (
              sortedBlogsByLikes.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLikes={() => {
                    dispatch(
                      createLike(blog.id, { ...blog, likes: blog.likes + 1 })
                    )
                    dispatch(
                      setNotification(
                        [
                          'success',
                          `Blog ${blog.title}'s likes updated to ${blog.likes}`,
                        ],
                        5
                      )
                    )
                  }}
                  handleRemove={() => {
                    dispatch(removeBlog(blog.id))
                    dispatch(
                      setNotification(
                        ['success', 'Blog deleted successfully'],
                        5
                      )
                    )
                  }}
                />
              ))
            ) : (
              <p className="text-center p-3">No blogs</p>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BlogList
