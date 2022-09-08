import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  if (!newToken) {
    token = null
  } else {
    token = `bearer ${newToken}`
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject) => {
  const headers = {
    Authorization: token,
    'Content-Type': 'application/json',
  }
  const response = await axios.post(baseUrl, newObject, {
    headers: headers,
  })
  return response.data
}

const update = async (id, blogObject) => {
  const headers = {
    Authorization: token,
    'Content-Type': 'application/json',
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogObject, {
    headers: headers,
  })
  return response.data
}

const remove = async (id) => {
  const headers = {
    Authorization: token,
    'Content-Type': 'application/json',
  }
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: headers,
  })
  return response.data
}

const addComment = async (id, comment) => {
  const headers = {
    Authorization: token,
    'Content-Type': 'application/json',
  }
  const obj = { comment: comment }
  const response = await axios.post(`${baseUrl}/${id}/comments`, obj, {
    headers: headers,
  })
  return response.data
}

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  setToken,
  addComment,
}
