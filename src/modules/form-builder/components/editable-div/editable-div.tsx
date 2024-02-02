import { FormEvent, useEffect, useRef, useState } from "react";

import { cn } from "@/utils/classname";

import { BlockTypesEnum, KeyCodesEnum } from "../../enums/form-builder.enum";
import { TBlocksStore } from "../../store";
import { TBlock } from "../../types/form-builder.types";
import { setBlockInFocus, setCursorToEnd } from "../../utils/form-builder.utils";
import { FormBuilderMenu } from "../form-builder-menu";

type EditableDivProps = Pick<React.DOMAttributes<HTMLDivElement>, "onKeyDown"> & {
    value: TBlock;
    index: number;
    className?: string;
    totalBlocks: number
    addBlock?: TBlocksStore["addBlock"];
    deleteBlock?: TBlocksStore["removeBlock"];
    onChange?: TBlocksStore["updateBlock"];
};

export const EditableDiv = ({ value, index, totalBlocks, addBlock, deleteBlock, className, onChange, onKeyDown }: EditableDivProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [prevKey, setPrevKey] = useState("");
    const [showBlocksMenu, setShowBlocksMenu] = useState(false);

    // const innerText = value.payload.data;
    const isFormTitle = value.type === BlockTypesEnum.FORM_TITLE;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const currentValue = e.currentTarget.innerText;
        const isPrevKeyShift = prevKey === KeyCodesEnum.SHIFT;

        const isValueEmpty = !currentValue || currentValue?.length === 0 || currentValue === "\n";

        if (e.key === KeyCodesEnum.ENTER && !isPrevKeyShift) {
            e.preventDefault();
            const newBlockPosition = index + 1;

            addBlock && addBlock(newBlockPosition);
            setShowBlocksMenu(false)
            return;
        }

        if (isValueEmpty && e.key === KeyCodesEnum.BACKSPACE && value.type !== BlockTypesEnum.FORM_TITLE) {
            e.preventDefault();
            const previousElementIndex = index === 0 ? 0 : index - 1;

            setBlockInFocus(previousElementIndex);
            deleteBlock && deleteBlock(value.id);
        }

        if (e.key === KeyCodesEnum.ARROW_UP) {
            e.preventDefault();
            const newBlockPosition = index === 0 ? 0 : index - 1;

            setShowBlocksMenu(false)
            setBlockInFocus(newBlockPosition);
        }

        if (e.key === KeyCodesEnum.ARROW_DOWN) {
            e.preventDefault();
            const newBlockPosition = index === totalBlocks - 1 ? index : index + 1;

            setShowBlocksMenu(false)
            setBlockInFocus(newBlockPosition);
        }

        onKeyDown && onKeyDown(e);
        setPrevKey(e.key);
    };

    const handleInput = (e: FormEvent<HTMLDivElement>) => {
        const currentElement = e.currentTarget;
        const currentValue = currentElement.innerHTML;

        const isBlocksMenuVisible = !isFormTitle && currentValue === '/'
        setShowBlocksMenu(isBlocksMenuVisible)

        onChange && onChange({ blockId: value.id, payload: { data: currentValue } });
    };

    const updateBlockTypeFromMenu = (blockType: BlockTypesEnum) => {
        const currentElement = ref.current;

        if (!currentElement) return;

        currentElement.innerHTML = "";
        setCursorToEnd(currentElement);
        setShowBlocksMenu(false)
        onChange && onChange({ blockId: value.id, payload: { data: "" }, type: blockType });
    };

    /**
     * Set initial value to the block
     * */
    useEffect(() => {
        const currentElement = ref.current;

        if (!currentElement) {
            return;
        }

        currentElement.innerHTML = value.payload.data;
        setCursorToEnd(currentElement);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative">
            <div
                ref={ref}
                id={value.id}
                contentEditable
                tabIndex={0}
                autoFocus
                placeholder={value.payload.placeholder}
                className={cn(
                    "caret:text-stone-900 relative mb-2 cursor-text whitespace-pre-wrap break-words text-base text-stone-900 outline-none",
                    "before:absolute before:text-stone-400 before:content-[attr(placeholder)]",
                    "before:hidden focus:empty:before:block",
                    isFormTitle && "pb-8 text-4xl font-bold empty:before:block",
                    className,
                )}
                onKeyDown={handleKeyDown}
                onInput={(e) => handleInput(e)}
            />

            {showBlocksMenu && <FormBuilderMenu onClick={updateBlockTypeFromMenu} />}
        </div>
    );
};
