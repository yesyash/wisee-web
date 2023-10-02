import { render, screen } from '@testing-library/react'
import Link from 'next/link'
import '@testing-library/jest-dom'

import { Button } from "../button"

describe('Button', () => {
    it('renders a text button', () => {
        render(<Button>Click me</Button>)

        const button = screen.getByRole('button', {
            name: 'Click me'
        })

        expect(button).toBeInTheDocument()
    })

    it('renders a text button with a loading indicator', () => {
        render(<Button loading>Click me</Button>)

        const button = screen.getByRole('button', {
            name: 'Click me'
        })

        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('data-loading')
    })

    it('renders a text button with disabled state', () => {
        render(<Button disabled>Click me</Button>)

        const button = screen.getByRole('button', {
            name: 'Click me'
        })

        expect(button).toBeInTheDocument()
        expect(button).toBeDisabled()
    })

    it('renders a link with primary button styles', () => {
        render(<Button asChild><Link href="/hello-world"></Link></Button>)
        const buttonAsLink = screen.getByRole('link')

        expect(buttonAsLink).toBeInTheDocument()
        expect(buttonAsLink).toHaveClass("bg-blue-600 text-stone-50 hover:bg-blue-700 active:bg-blue-800")
        expect(buttonAsLink).toHaveAttribute('href', '/hello-world')
    })
})
