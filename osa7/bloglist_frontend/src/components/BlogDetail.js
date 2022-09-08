import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const BlogDetail = () => {
  const user = useSelector((state) => state.user)
  const blogdetail = useSelector((state) => state.blogdetail)
  return <>{user === null ? null : <Card blog={blogdetail} />}</>
}

export default BlogDetail
