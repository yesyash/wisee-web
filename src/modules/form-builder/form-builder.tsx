import Head from "next/head"

import { EditableDiv } from "./components/editable-div"
import { FormBuilderHeader } from "./components/form-builder-header"
import { BlockTypeEnum } from "./enums/form-builder.enum"
import { useFormBuilderStore } from "./store"

export const FormBuilder = () => {
    const { blocks } = useFormBuilderStore((state) => ({
        blocks: state.blocks,
        updateBlock: state.updateBlock
    }))

    return (
        <div>
            <Head>
                <title>Create form - {process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Head>

            <FormBuilderHeader />

            <main>
                <div className="pt-14 h-44 w-full"></div>
                <div className="max-w-screen-lg px-4 mx-auto">
                    {blocks.map(block => (
                        <EditableDiv
                            key={block.id}
                            id={block.id}
                            payload={block.payload}
                            type={block.type}
                            className={block.type === BlockTypeEnum.FORM_TITLE ? "text-4xl font-bold empty:before:block" : "mb-2"}
                            placeholder={block.type === BlockTypeEnum.FORM_TITLE ? "Form title" : "Type something..."}
                        />
                    ))}

                </div>
            </main>
        </div>
    )
}
