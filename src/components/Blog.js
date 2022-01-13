import React, {useState} from 'react'

const Blog = ({blog}) => {
  const [detailView, setDetailView] = useState(false)

  const hideWhenDetail = { display: detailView ? 'none' : '' }
  const showWhenDetail = { display: detailView ? '' : 'none' }

  const toggleDetail = () => {
    setDetailView(!detailView)
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
        likes {blog.likes} <button>like</button><br/>
        {blog.user.username}
      </div> 
    </div> 
  )
}

export default Blog