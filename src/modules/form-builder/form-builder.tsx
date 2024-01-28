import dynamic from "next/dynamic"
import Head from "next/head"

import { FormBuilderHeader } from "./components/form-builder-header"
import { useFormBuilderStore } from "./store"
const EditableDiv = dynamic(() => import('./components/editable-div').then(mod => mod.EditableDiv), { loading: () => <p>loading...</p>, ssr: false })


export const FormBuilder = () => {
    const { blocks, updateBlock } = useFormBuilderStore((state) => ({
        blocks: state.blocks,
        updateBlock: state.updateBlock
    }))

    return (
        <div>
            <Head>
                <title>Create form</title>
            </Head>

            <FormBuilderHeader />

            <main>
                <div className="pt-14 h-44 w-full"></div>
                <div className="max-w-screen-lg px-4 mx-auto">
                    {blocks.map(block => (
                        <EditableDiv
                            key={block.id}
                            value={block}
                            onChange={(data) => updateBlock(data)}
                        />
                    ))}

                </div>
            </main>
        </div>
    )
}
