import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { userEvent } from "@testing-library/user-event"

import { BlockTypesEnum } from '@/modules/form-builder/enums/form-builder.enum'
import { TBlock } from '@/modules/form-builder/types/form-builder.types'

import { EditableDiv } from '../editable-div'

const PLACEHOLDER = "hello world"
const BLOCK_ONE_TEXT = "block 1"
const BLOCK_TWO_TEXT = "block 2"
const EDITABLE_DIV_NOT_FOUND_ERROR = "Editable div is not found"

type TGetDefaultTextInputDataArgs = {
    data?: string
    id?: string
}

const getDefaultTextInputData = ({ data, id }: TGetDefaultTextInputDataArgs = {}): TBlock => {
    return { id: id ?? '1', payload: { data: data ?? "", placeholder: PLACEHOLDER }, type: BlockTypesEnum.TEXT }
}

describe('EditableDiv', () => {
    it('render a input of type text and it accepts a value', async () => {
        render(
            <EditableDiv index={0} totalBlocks={1} value={getDefaultTextInputData()} />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
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
            <EditableDiv index={0} totalBlocks={1} value={getDefaultTextInputData()} addBlock={addBlock} />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
        }

        await userEvent.click(editableDiv)
        expect(editableDiv).toHaveFocus()

        await userEvent.type(editableDiv, "{enter}")
        expect(addBlock).toHaveBeenCalledTimes(1)
    })

    it("should delete a block when user press backspace and no value is present", async () => {
        const deleteBlock = jest.fn()

        render(
            <EditableDiv index={0} totalBlocks={1} value={getDefaultTextInputData()} deleteBlock={deleteBlock} />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
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
        render(
            <>
                <EditableDiv
                    index={0}
                    totalBlocks={2}
                    value={getDefaultTextInputData({ id: "1", data: BLOCK_ONE_TEXT })}
                />

                <EditableDiv
                    index={1}
                    totalBlocks={2}
                    value={getDefaultTextInputData({ id: "2", data: BLOCK_TWO_TEXT })}
                />
            </>
        )

        const block1 = document.getElementById("1")
        const block2 = document.getElementById("2")

        if (!block1 || !block2) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
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
                <EditableDiv
                    index={0}
                    totalBlocks={2}
                    value={getDefaultTextInputData({ id: "1", data: BLOCK_ONE_TEXT })}
                />

                <EditableDiv
                    index={1}
                    totalBlocks={2}
                    value={getDefaultTextInputData({ id: "2", data: BLOCK_TWO_TEXT })}
                />
            </>
        )

        const block1 = document.getElementById("1")
        const block2 = document.getElementById("2")

        if (!block1 || !block2) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
        }

        expect(block1).toHaveTextContent(BLOCK_ONE_TEXT)
        expect(block2).toHaveTextContent(BLOCK_TWO_TEXT)

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
            <EditableDiv
                index={0}
                totalBlocks={1}
                value={getDefaultTextInputData({ id: "1", data: BLOCK_ONE_TEXT })}
            />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
        }

        await userEvent.click(editableDiv)
        expect(editableDiv).toHaveFocus()

        await userEvent.type(editableDiv, "{shift}{enter}")
        expect(addBlock).toHaveBeenCalledTimes(0)
    })

    it("show menu if the user enters only / character", async () => {
        render(
            <EditableDiv
                index={0}
                totalBlocks={1}
                value={getDefaultTextInputData({ data: "/" })}
            />
        )

        const editableDiv = document.getElementById("1")
        const menu = document.querySelector("[data-test-id='formBuilderMenu']")

        if (!editableDiv) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
        }

        await userEvent.click(editableDiv)
        expect(menu).toBeInTheDocument()
    })

    it("should change the block type when user clicks on the menu", async () => {
        const updateBlock = jest.fn()

        render(
            <EditableDiv
                index={0}
                totalBlocks={1}
                value={getDefaultTextInputData({ data: "/" })}
                onChange={updateBlock}
            />
        )

        const editableDiv = document.getElementById("1")
        const menu = document.querySelector("[data-test-id='formBuilderMenu']")

        if (!editableDiv || !menu) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
        }

        await userEvent.click(editableDiv)
        expect(menu).toBeInTheDocument()

        const textOption = screen.getByText("Email")
        expect(textOption).toBeInTheDocument()

        await userEvent.click(textOption)
        expect(updateBlock).toHaveBeenCalledTimes(1)
    })
})
