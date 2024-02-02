import dynamic from "next/dynamic"
import Head from "next/head"

import { FormBuilderHeader } from "./components/form-builder-header"
import { useFormBuilderStore } from "./store"
const EditableDiv = dynamic(() => import('./components/editable-div').then(mod => mod.EditableDiv), { loading: () => <p>loading...</p>, ssr: false })


export const FormBuilder = () => {
    const { blocks, totalBlocks, addBlock, deleteBlock, updateBlock } = useFormBuilderStore((state) => ({
        blocks: state.blocks,
        addBlock: state.addBlock,
        deleteBlock: state.removeBlock,
        totalBlocks: state.blocks.length,
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
                    {blocks.map((block, idx) => (
                        <EditableDiv
                            key={block.id}
                            index={idx}
                            value={block}
                            addBlock={addBlock}
                            deleteBlock={deleteBlock}
                            totalBlocks={totalBlocks}
                            onChange={(data) => updateBlock(data)}
                        />
                    ))}

                </div>
            </main>
        </div>
    )
}
