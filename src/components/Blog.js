import React, {useState} from 'react'
import blogs from '../services/blogs'

const Blog = ({blog, handleLike}) => {
  const [detailView, setDetailView] = useState(false)

  const hideWhenDetail = { display: detailView ? 'none' : '' }
  const showWhenDetail = { display: detailView ? '' : 'none' }

  const toggleDetail = () => {
    setDetailView(!detailView)
  }

  const likePost = (event) => {
    event.preventDefault()
    handleLike(blog.id,{
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url 
    })
  }
  
  return (
    <div>
      <div className="blog-style" style={hideWhenDetail}>
        {blog.title} {blog.author} <button onClick={toggleDetail}>View</button>
      </div> 
      <div className="blog-style" style={showWhenDetail}>
        {blog.title} {blog.author} <button onClick={toggleDetail}>Hide</button>
        <br/>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={likePost}>like</button><br/>
        {blog.user.username}
      </div> 
    </div> 
  )
}

export default Blog