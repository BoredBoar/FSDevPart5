import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
    const blog = {
        id: "61ddc994ffd56ce6978594c0",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "61ddc994ffd56ce6978594b7"
    }

    test('default view should title and author of blog, but not likes and url', () => {

        const component = render(
            <Blog blog={blog} />
          )
    
        const div = component.container.querySelector('.blog-collapse')
        expect(div).toHaveTextContent(
        'Michael Chan'
        )

        expect(div).toHaveTextContent(
        'React patterns'
        )
        
        expect(div).not.toHaveTextContent(
            'likes'
        )

        expect(div).not.toHaveTextContent(
            "https://reactpatterns.com/"
        )

        expect(div).not.toHaveStyle('display: none')

        const div2 = component.container.querySelector('.blog-expand')

        expect(div2).toHaveStyle('display: none')

    })

    test('when show button is clicked, expanded detail is shown', () => {
        const component = render(
            <Blog blog={blog} />
        )

        const button = component.getByText('View')
        fireEvent.click(button)

        const div = component.container.querySelector('.blog-collapse')
        expect(div).toHaveStyle('display: none')

        const div2 = component.container.querySelector('.blog-expand')
        expect(div2).toHaveTextContent(
            'Michael Chan'
        )

        expect(div2).toHaveTextContent(
            'React patterns'
        )
        
        expect(div2).toHaveTextContent(
            'likes'
        )

        expect(div2).toHaveTextContent(
            "https://reactpatterns.com/"
        )

        expect(div2).not.toHaveStyle('display: none')
    })

    test('when like button is clicked twice, function handler is called twice', () => {
        const likeHandler = jest.fn()

        const component = render(
            <Blog blog={blog} handleLike={likeHandler}/>
        )
        
        const button = component.getByText('View')
        fireEvent.click(button)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(likeHandler.mock.calls).toHaveLength(2)
    })

})