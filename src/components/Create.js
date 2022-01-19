import React, {useState} from 'react'

const Create = ({handleCreate}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        handleCreate({title, author, url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
    <div>
        <h2>Create New</h2>
        <form onSubmit={createBlog}>
            <div>
            title
                <input
                id="title"
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
            />
            </div>
            <div>
            author
                <input
                id="author"
                type="author"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
            />
            </div>
            <div>
            url
                <input
                id="url"
                type="text"
                value={url}
                name="URL"
                onChange={({ target }) => setUrl(target.value)}
            />
            </div>
            <button type="submit">create</button>
        </form>
    </div>  
    )
}

export default Create