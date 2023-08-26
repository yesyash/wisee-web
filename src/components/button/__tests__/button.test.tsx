import { render, screen } from '@testing-library/react'

import { Button } from "../button"
import '@testing-library/jest-dom'

describe('Button', () => {
    it('renders a text button', () => {
        render(<Button>Click me</Button>)

        const heading = screen.getByRole('button', {
            name: "Click me",
        })

        expect(heading).toBeInTheDocument()
    })
})
