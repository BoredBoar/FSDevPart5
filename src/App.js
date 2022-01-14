import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notifier from './components/Notifier'
import Togglable from './components/Togglable'
import _ from 'lodash'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  const [notifyMessage, setNotifyMessage] = useState(null)

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifyMessage({msg: `Login attempt failed.`, type: 'error'})
        setTimeout(() => {setNotifyMessage(null)}, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const handleCreate = async (blog) => {
 
    try {
      const response = await blogService.postBlog({token:user.token,blog:blog})
      blogFormRef.current.toggleVisibility()
      setBlogs(_.sortBy(blogs.concat(response),'likes'))
      setNotifyMessage({msg: `A new blog "${response.title}" by ${response.author} added`, type: 'success'})
        setTimeout(() => {setNotifyMessage(null)}, 5000)
    } catch(exception) {
      setNotifyMessage({msg: `An error occurred while trying to add "${blog.title}"`, type: 'error'})
        setTimeout(() => {setNotifyMessage(null)}, 5000)
    }
  }

  const handleLike = async (id, blog) => {
    try {
      const response = await blogService.updateBlog(id,blog,user.token)
      setBlogs(_(blogs).map(blog => {
          if(blog.id === response.id) return response
          return blog
        }).sortBy('likes').reverse().value())
      setNotifyMessage({msg: `"${response.title}" was successfully updated`, type: 'success'})
        setTimeout(() => {setNotifyMessage(null)}, 5000)
    } catch(excpetion) {
      console.error(excpetion)
      setNotifyMessage({msg: `An error occurred while trying to update "${blog.title}"`, type: 'error'})
        setTimeout(() => {setNotifyMessage(null)}, 5000)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const newBlogs = await blogService.getAll()
      const sortedBlogs = _(newBlogs).sortBy('likes').reverse().value()
      setBlogs(sortedBlogs)
    }
    fetchData()  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if(user === null){
    return (
      <div>
        <Notifier message={notifyMessage}/>
        <h2>login</h2>
        <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </div>
    )
  }
  return (
    <div>
      <Notifier message={notifyMessage}/>   
      <h2>blogs</h2>
      <h3>
        {user.username} logged in 
        <button onClick={handleLogout}>Logout</button>
      </h3>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <Create handleCreate={handleCreate} />
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} />
        )}
      </div>
    </div>
  )
}

export default App