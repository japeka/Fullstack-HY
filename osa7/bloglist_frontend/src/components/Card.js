import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

const Card = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const textStyle = 'mb-3 font-normal text-gray-700 dark:text-gray-400'
  const buttonStyle =
    'bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-5 ml-3 rounded p-10 uppercase'

  const handleSubmit = async () => {
    dispatch(createComment(blog.id, comment))
  }

  return (
    blog.title && (
      <div className="card w-full p-5">
        <h2 className="uppercase text-2xl mb-5">{blog.url}</h2>
        <p className={textStyle}>
          <span className="countLikes">{blog.likes}</span>
          <button onClick={() => {}} className={'blogLikes ' + buttonStyle}>
            likes
          </button>
        </p>
        <p>added by {blog.author}</p>

        <form className="mt-5" onSubmit={handleSubmit}>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 mb-4"
          />
          <button className={buttonStyle}>add comment</button>
        </form>
        {blog.comments.length === 0 ? (
          <p>No comments</p>
        ) : (
          <>
            <h2 className="uppercase text-2xl mb-5 mt-5">comments</h2>
            <ul>
              {blog.comments.map((comment, i) => (
                <li className="list-disc" key={i}>
                  {comment}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    )
  )
}

Card.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Card
