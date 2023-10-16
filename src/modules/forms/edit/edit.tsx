import Head from "next/head"

import { EditPageHeader } from "./components"
import { EditableDiv } from "./components/editable-div"
import { BlockTypeEnum, EditFormModeEnum } from "./enums"
import { useEditFormStore } from "./store"

type PageProps = {
    mode: EditFormModeEnum
}

export const Edit = ({ mode }: PageProps) => {
    const { blocks } = useEditFormStore((state) => ({
        blocks: state.blocks,
        updateBlock: state.updateBlock
    }))

    const pageTitle = mode === EditFormModeEnum.CREATE_WITHOUT_LOGIN ? "Create form" : "Edit form"

    return (
        <>
            <Head>
                <title>{pageTitle} — {process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Head>

            <EditPageHeader />

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
        </>
    )
}
