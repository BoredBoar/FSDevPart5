import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Create from './Create'

describe('Create new blog component', () => {
    test('when a new blog is subbmitted, the correct information is recieved by the handler and contents are reset', () => {
        const createHandler = jest.fn()

        const component = render(
            <Create handleCreate={createHandler}/>
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const id = component.container.querySelector('#id')
        const form = component.container.querySelector('form')

        const titleString = "This is my title"
        fireEvent.change(title, { 
            target: { value: titleString } 
        })

        const authorString = "Doe, John"
        fireEvent.change(author, { 
            target: { value: authorString } 
        })

        const urlString = 'https://example.com'
        fireEvent.change(url, { 
            target: { value: urlString } 
        })

        fireEvent.submit(form)

        expect(createHandler.mock.calls).toHaveLength(1)
        expect(createHandler.mock.calls[0][0].title).toBe(titleString)
        expect(createHandler.mock.calls[0][0].author).toBe(authorString)
        expect(createHandler.mock.calls[0][0].url).toBe(urlString)

        expect(title).toHaveTextContent('')
        expect(author).toHaveTextContent('')
        expect(url).toHaveTextContent('')

    })

})