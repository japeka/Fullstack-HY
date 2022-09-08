import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const Blog = ({ blog }) => {
  return (
    <div>
      <Link className="hover:bg-black-400" to={`/blogs/${blog.id}`}>
        <li className="p-3 mb-2">
          <span className="title">{blog.title}</span>{' '}
          <span className="author ml-5 p-2">{blog.author}</span>
        </li>
      </Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog
