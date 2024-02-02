import '@testing-library/jest-dom'

import { useState } from 'react'

import { render, renderHook, screen } from '@testing-library/react'
import { userEvent } from "@testing-library/user-event"

import { BlockTypesEnum } from '@/modules/form-builder/enums/form-builder.enum'
import { TBlock } from '@/modules/form-builder/types/form-builder.types'

import { EditableDiv } from '../editable-div'

const PLACEHOLDER = "hello world"
const BLOCK_ONE_TEXT = "block 1"
const BLOCK_TWO_TEXT = "block 2"
const EDITABLE_DIV_NOT_FOUND_ERROR = "Editable div is not found"

type TGetDefaultTextInputDataArgs = {
    id?: string
    data?: string
    placeholder?: string
    type?: BlockTypesEnum
}

const getDefaultTextInputData = ({
    id = "1",
    data = "",
    placeholder = PLACEHOLDER,
    type = BlockTypesEnum.TEXT
}: TGetDefaultTextInputDataArgs = {}): TBlock => {
    return { id, payload: { data, placeholder }, type }
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
        const { result: { current: [value, setValue] } } = renderHook(() => useState(getDefaultTextInputData()))

        render(
            <EditableDiv
                index={0}
                value={value}
                totalBlocks={1}
                onChange={(data) => setValue(getDefaultTextInputData({ data: data.payload?.data, type: data.type }))
                }
            />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
        }

        await userEvent.click(editableDiv)
        await userEvent.type(editableDiv, "/")

        expect(editableDiv).toHaveTextContent("/")

        const menu = document.querySelector("[data-test-id='formBuilderMenu']")
        expect(menu).toBeInTheDocument()
    })

    it("should change the block type when user clicks on the menu", async () => {
        const onChange = jest.fn()

        render(
            <EditableDiv
                index={0}
                value={getDefaultTextInputData()}
                totalBlocks={1}
                onChange={(data) => onChange(data)}
            />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
        }

        await userEvent.click(editableDiv)
        await userEvent.type(editableDiv, "/")

        const menu = document.querySelector("[data-test-id='formBuilderMenu']")
        expect(menu).toBeInTheDocument()

        const textOption = screen.getByText("Email")
        expect(textOption).toBeInTheDocument()

        await userEvent.click(textOption)
        // we are checking the value of the second call because the first call is fired when user types / in the input
        expect(onChange.mock.calls[1][0]['type']).toBe(BlockTypesEnum.INPUT_EMAIL)
    })

    it("show not show menu if the user enters only / character in form title", async () => {
        const { result: { current: [value, setValue] } } = renderHook(() => useState(getDefaultTextInputData({ type: BlockTypesEnum.FORM_TITLE })))

        render(
            <EditableDiv
                index={0}
                value={value}
                totalBlocks={1}
                onChange={(data) => setValue(getDefaultTextInputData({ data: data.payload?.data, type: data.type }))
                }
            />
        )

        const editableDiv = document.getElementById("1")

        if (!editableDiv) {
            throw new Error(EDITABLE_DIV_NOT_FOUND_ERROR)
        }

        await userEvent.click(editableDiv)
        await userEvent.type(editableDiv, "/")

        expect(editableDiv).toHaveTextContent("/")

        const menu = document.querySelector("[data-test-id='formBuilderMenu']")
        expect(menu).not.toBeInTheDocument()
    })
})
