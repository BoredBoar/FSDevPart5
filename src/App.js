import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notifier from './components/Notifier'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null) 
  const [notifyMessage, setNotifyMessage] = useState(null)

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

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.postBlog({token:user.token,blog:{title,author,url}})
      setBlogs(blogs.concat(response))
      setNotifyMessage({msg: `A new blog "${response.title}" by ${response.author} added`, type: 'success'})
        setTimeout(() => {setNotifyMessage(null)}, 5000)
    } catch(exception) {
      setNotifyMessage({msg: `An error occurred while trying to add "${title}"`, type: 'error'})
        setTimeout(() => {setNotifyMessage(null)}, 5000)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
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
      <div>
        {user.username} logged in 
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Create handleCreate={handleCreate} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App