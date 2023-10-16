import { render, screen } from '@testing-library/react'
import { userEvent } from "@testing-library/user-event"
import '@testing-library/jest-dom'

import { BlockTypeEnum } from '../../..'
import { EditableDiv } from '../editable-div'

describe('EditableDiv', () => {
    it('renders a text on input', async () => {
        render(<EditableDiv id='1' payload={{ data: "", placeholder: "" }} type={BlockTypeEnum.TEXT} />)
        const editableDiv = document.getElementById("1")

        expect(editableDiv).toBeInTheDocument()
        expect(editableDiv).toHaveTextContent("")
        expect(editableDiv).toHaveAttribute("contenteditable")

        if (!editableDiv) {
            return
        }

        await userEvent.click(editableDiv)
        await userEvent.type(editableDiv, "hello world")

        expect(editableDiv).toHaveTextContent("hello world")
        screen.debug()
        expect(editableDiv).toHaveFocus()
    })
})
