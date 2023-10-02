import { fireEvent, render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { Input } from '..'

const setup = () => {
    const utils = render(<Input aria-label='input-element' />)
    const input = screen.getByLabelText('input-element')
    return {
        input,
        ...utils,
    }
}

describe('Button', () => {
    it('renders a input element', () => {
        const input = setup().input as HTMLInputElement

        fireEvent.change(input, { target: { value: 'hello_world' } })
        expect(input.value).toBe('hello_world')
    })
})
