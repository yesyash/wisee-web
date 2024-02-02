import { Button } from "@/components"

import { BlockTypesEnum } from "../../enums/form-builder.enum"

const list: BlockTypesEnum[] = [
    BlockTypesEnum.INPUT_TEXT,
    BlockTypesEnum.INPUT_EMAIL,
    BlockTypesEnum.INPUT_NUMBER,
    BlockTypesEnum.MULTI_CHOICE_OPTION,
]

const listItemToTextMap: Record<BlockTypesEnum, string> = {
    [BlockTypesEnum.INPUT_TEXT]: "Text",
    [BlockTypesEnum.INPUT_EMAIL]: "Email",
    [BlockTypesEnum.INPUT_NUMBER]: "Number",
    [BlockTypesEnum.MULTI_CHOICE_OPTION]: "Multiple choice",
    [BlockTypesEnum.CODEBLOCK]: "Codeblock",
    [BlockTypesEnum.TEXT]: "Text",
    [BlockTypesEnum.TEXTAREA]: "Textarea",
    [BlockTypesEnum.FORM_TITLE]: "Form title",
}

type Props = {
    onClick: (blockType: BlockTypesEnum) => void
}

export const FormBuilderMenu = ({ onClick }: Props) => {
    return (
        <div data-test-id="formBuilderMenu" className="absolute top-full py-3 z-50 bg-white">
            <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden">
                {list.map(item =>
                    <Button
                        key={item}
                        size="sm"
                        variant="ghost"
                        onClick={() => onClick && onClick(item)}
                        className="px-2 w-full justify-start rounded-none"
                    >
                        {listItemToTextMap[item]}
                    </Button>
                )}
            </div>
        </div>
    )
}
