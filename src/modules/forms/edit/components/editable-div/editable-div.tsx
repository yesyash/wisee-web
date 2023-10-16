import { useEffect, useRef, useState } from "react"

import { cn } from "@/utils/classname"

import { BlockTypeEnum, KeyCodeEnum } from "../../enums"
import { useEditFormStore } from "../../store"
import { TBlock } from "../../types/edit-form-types"
import { setBlockInFocus } from "../../utils"

type EditableDivProps = Pick<React.DOMAttributes<HTMLDivElement>, "onInput" | "onKeyDown"> & TBlock & {
    placeholder?: string
    className?: string
    payload: TBlock['payload']
}

export const EditableDiv = ({ id, type, payload, className, placeholder, onInput, onKeyDown }: EditableDivProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [prevKey, setPrevKey] = useState("")

    const { totalBlocks, addBlock, deleteBlock } = useEditFormStore((state) => ({
        totalBlocks: state.blocks.length,
        addBlock: state.addBlock,
        deleteBlock: state.removeBlock,
    }))

    useEffect(() => {
        const inputRef = ref.current
        if (!inputRef) return

        if (type === BlockTypeEnum.TEXT) {
            inputRef.innerHTML = payload.data
        }

        inputRef.innerHTML = payload.placeholder

    }, [])


    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const currentValue = e.currentTarget.innerText
        const isPrevKeyShift = prevKey === KeyCodeEnum.SHIFT

        const elements = document.querySelectorAll("[contenteditable]")
        const currentElementIndex = Array.from(elements).findIndex((el) => el.id === id);

        if (currentElementIndex === -1) {
            return
        }

        if (e.key === KeyCodeEnum.ENTER && !isPrevKeyShift) {
            e.preventDefault()
            const newBlockPosition = currentElementIndex + 1

            addBlock(newBlockPosition)
            setBlockInFocus(newBlockPosition)
            return
        }

        if (currentValue?.length === 0 && e.key === KeyCodeEnum.BACKSPACE && type !== BlockTypeEnum.FORM_TITLE) {
            e.preventDefault()
            const previousElementIndex = currentElementIndex === 0 ? 0 : currentElementIndex - 1

            setBlockInFocus(previousElementIndex)

            deleteBlock(id)
        }

        if (e.key === KeyCodeEnum.ARROW_UP) {
            e.preventDefault()
            const newBlockPosition = currentElementIndex === 0 ? 0 : currentElementIndex - 1

            setBlockInFocus(newBlockPosition)
        }

        if (e.key === KeyCodeEnum.ARROW_DOWN) {
            e.preventDefault()
            const newBlockPosition = currentElementIndex === totalBlocks - 1 ? currentElementIndex : currentElementIndex + 1

            setBlockInFocus(newBlockPosition)
        }

        onKeyDown && onKeyDown(e)
        setPrevKey(e.key)
    }

    return (
        <div className="relative">
            <div
                ref={ref}
                id={id}
                contentEditable
                tabIndex={0}
                autoFocus
                placeholder={placeholder}
                className={cn(
                    "text-base relative outline-none whitespace-pre-wrap break-words text-stone-900 caret:text-stone-900 cursor-text",
                    "before:content-[attr(placeholder)] before:text-stone-400 before:absolute",
                    "focus:empty:before:block before:hidden",
                    type === BlockTypeEnum.FORM_TITLE && "pb-8",
                    className
                )}
                onKeyDown={handleKeyDown}
                onInput={onInput}
            />
        </div>
    )
}
