import React, {useState} from 'react'


const Blog = ({blog, handleLike, handleRemove}) => {
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

  const removePost = (event) => {
    event.preventDefault()
    handleRemove(blog.id)
  }
  
  return (
    <div>
      <div className="blog-style blog-collapse" style={hideWhenDetail}>
        {blog.title} {blog.author} <button onClick={toggleDetail}>View</button>
      </div> 
      <div className="blog-style blog-expand" style={showWhenDetail}>
        {blog.title} {blog.author} <button onClick={toggleDetail}>Hide</button>
        <br/>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={likePost}>like</button><br/>
        {blog.user.username}<br/>
        <button onClick={removePost}>remove</button>
      </div> 
    </div> 
  )
}

export default Blog