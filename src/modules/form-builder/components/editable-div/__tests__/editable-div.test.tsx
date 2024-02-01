import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { userEvent } from "@testing-library/user-event"

import { BlockTypesEnum } from '@/modules/form-builder/enums/form-builder.enum'
import { TBlock } from '@/modules/form-builder/types/form-builder.types'

import { EditableDiv } from '../editable-div'

const PLACEHOLDER = "hello world"
const DEFAULT_TEXT_INPUT: TBlock = { id: '1', payload: { data: "", placeholder: PLACEHOLDER }, type: BlockTypesEnum.TEXT }

describe('EditableDiv', () => {
    it('render a input of type text and it accepts a value', async () => {
        render(
            <EditableDiv totalBlocks={1} value={DEFAULT_TEXT_INPUT} />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error("Editable div is not found")
        }

        expect(editableDiv).toBeInTheDocument()
        expect(editableDiv).toHaveTextContent("")
        expect(editableDiv).toHaveAttribute("contenteditable")
        expect(editableDiv).toHaveAttribute("placeholder", PLACEHOLDER)

        await userEvent.click(editableDiv)
        expect(editableDiv).toHaveFocus()

        await userEvent.type(editableDiv, "hello world")
        expect(editableDiv).toHaveTextContent("hello world")
    })

    it("should add a new block when user press enter", async () => {
        const addBlock = jest.fn()

        render(
            <EditableDiv totalBlocks={1} value={DEFAULT_TEXT_INPUT} addBlock={addBlock} />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error("Editable div is not found")
        }

        await userEvent.click(editableDiv)
        expect(editableDiv).toHaveFocus()

        await userEvent.type(editableDiv, "{enter}")
        expect(addBlock).toHaveBeenCalledTimes(1)
    })

    it("should delete a block when user press backspace and no value is present", async () => {
        const deleteBlock = jest.fn()

        render(
            <EditableDiv totalBlocks={1} value={DEFAULT_TEXT_INPUT} deleteBlock={deleteBlock} />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error("Editable div is not found")
        }

        await userEvent.click(editableDiv)
        expect(editableDiv).toHaveFocus()
        expect(editableDiv).toHaveTextContent("")

        await userEvent.clear(editableDiv)
        await userEvent.type(editableDiv, "{backspace}")
        expect(deleteBlock).toHaveBeenCalledTimes(1)

        await userEvent.type(editableDiv, "testing delete")
        expect(editableDiv).toHaveTextContent("testing delete")

        await userEvent.clear(editableDiv)
        await userEvent.type(editableDiv, "{backspace}")

        expect(deleteBlock).toHaveBeenCalledTimes(2)
    })

    it("go to previous block if when multiple blocks are present and user press arrow up", async () => {
        const BLOCK_ONE_TEXT = "block 1"
        const BLOCK_TWO_TEXT = "block 2"

        render(
            <>
                <EditableDiv totalBlocks={2} value={{ ...DEFAULT_TEXT_INPUT, id: '1', payload: { ...DEFAULT_TEXT_INPUT.payload, data: BLOCK_ONE_TEXT } }} />
                <EditableDiv totalBlocks={2} value={{ ...DEFAULT_TEXT_INPUT, id: '2', payload: { ...DEFAULT_TEXT_INPUT.payload, data: BLOCK_TWO_TEXT } }} />
            </>
        )

        const block1 = document.getElementById("1")
        const block2 = document.getElementById("2")

        if (!block1 || !block2) {
            throw new Error("Editable div is not found")
        }

        expect(block1).toHaveTextContent(BLOCK_ONE_TEXT)
        expect(block2).toHaveTextContent(BLOCK_TWO_TEXT)

        await userEvent.click(block2)
        expect(block2).toHaveFocus()

        await userEvent.type(block2, "{arrowup}")
        expect(block1).toHaveFocus()

        await userEvent.type(block1, "{arrowup}")
        expect(block1).toHaveFocus()
    })

    it("go to next block if when multiple blocks are present and user press arrow down", async () => {
        render(
            <>
                <EditableDiv totalBlocks={2} value={{ ...DEFAULT_TEXT_INPUT, id: '1', payload: { ...DEFAULT_TEXT_INPUT.payload, data: 'block 1' } }} />
                <EditableDiv totalBlocks={2} value={{ ...DEFAULT_TEXT_INPUT, id: '2', payload: { ...DEFAULT_TEXT_INPUT.payload, data: 'block 2' } }} />
            </>
        )

        const block1 = document.getElementById("1")
        const block2 = document.getElementById("2")

        if (!block1 || !block2) {
            throw new Error("Editable div is not found")
        }

        expect(block2).toHaveTextContent("block 2")
        expect(block1).toHaveTextContent("block 1")

        await userEvent.click(block1)
        expect(block1).toHaveFocus()

        await userEvent.type(block1, "{arrowdown}")
        expect(block2).toHaveFocus()

        await userEvent.type(block2, "{arrowdown}")
        expect(block2).toHaveFocus()
    })

    it("if shift + enter is pressed, it should not add a new block", async () => {
        const addBlock = jest.fn()

        render(
            <EditableDiv totalBlocks={1} value={{ ...DEFAULT_TEXT_INPUT, id: '1', payload: { ...DEFAULT_TEXT_INPUT.payload, data: 'block' } }} />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error("Editable div is not found")
        }

        await userEvent.click(editableDiv)
        expect(editableDiv).toHaveFocus()

        await userEvent.type(editableDiv, "{shift}{enter}")
        expect(addBlock).toHaveBeenCalledTimes(0)
    })
})
