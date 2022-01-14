import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postBlog = async (data) => {
  const response = await axios.post(baseUrl, data.blog, {
    headers: {
      authorization:`bearer ${data.token}`
    }
  })
  return response.data
}

const updateBlog = async (id, blog, token) => {
  const response = await axios.post(`${baseUrl}/${id}`, blog, {
    headers: {
      authorization:`bearer ${token}`
    }
  })
  return response.data
}

export default { getAll, postBlog, updateBlog }