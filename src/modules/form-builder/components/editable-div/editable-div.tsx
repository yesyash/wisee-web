import { useEffect, useRef, useState } from "react"

import { cn } from "@/utils/classname"

import { BlockTypesEnum, KeyCodesEnum } from "../../enums/form-builder.enum"
import { useFormBuilderStore } from "../../store"
import { TBlock } from "../../types/form-builder.types"
import { setBlockInFocus } from "../../utils/form-builder.utils"

type EditableDivProps = Pick<React.DOMAttributes<HTMLDivElement>, "onInput" | "onKeyDown"> & TBlock & {
    placeholder?: string
    className?: string
    payload: TBlock['payload']
}

export const EditableDiv = ({ id, type, payload, className, placeholder, onInput, onKeyDown }: EditableDivProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [prevKey, setPrevKey] = useState("")

    const { totalBlocks, addBlock, deleteBlock } = useFormBuilderStore((state) => ({
        totalBlocks: state.blocks.length,
        addBlock: state.addBlock,
        deleteBlock: state.removeBlock,
    }))


    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const currentValue = e.currentTarget.innerText
        const isPrevKeyShift = prevKey === KeyCodesEnum.SHIFT

        const elements = document.querySelectorAll("[contenteditable]")
        const currentElementIndex = Array.from(elements).findIndex((el) => el.id === id);

        if (currentElementIndex === -1) {
            return
        }

        if (e.key === KeyCodesEnum.ENTER && !isPrevKeyShift) {
            e.preventDefault()
            const newBlockPosition = currentElementIndex + 1

            addBlock(newBlockPosition)
            setBlockInFocus(newBlockPosition)
            return
        }

        if (currentValue?.length === 0 && e.key === KeyCodesEnum.BACKSPACE && type !== BlockTypesEnum.FORM_TITLE) {
            e.preventDefault()
            const previousElementIndex = currentElementIndex === 0 ? 0 : currentElementIndex - 1

            setBlockInFocus(previousElementIndex)

            deleteBlock(id)
        }

        if (e.key === KeyCodesEnum.ARROW_UP) {
            e.preventDefault()
            const newBlockPosition = currentElementIndex === 0 ? 0 : currentElementIndex - 1

            setBlockInFocus(newBlockPosition)
        }

        if (e.key === KeyCodesEnum.ARROW_DOWN) {
            e.preventDefault()
            const newBlockPosition = currentElementIndex === totalBlocks - 1 ? currentElementIndex : currentElementIndex + 1

            setBlockInFocus(newBlockPosition)
        }

        onKeyDown && onKeyDown(e)
        setPrevKey(e.key)
    }

    useEffect(() => {
        const inputRef = ref.current
        if (!inputRef) return

        if (type === BlockTypesEnum.TEXT) {
            inputRef.innerHTML = payload.data
        }

        inputRef.innerHTML = payload.placeholder

    }, [])

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
                    type === BlockTypesEnum.FORM_TITLE && "pb-8",
                    className
                )}
                onKeyDown={handleKeyDown}
                onInput={onInput}
            />
        </div>
    )
}
