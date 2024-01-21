import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { BlockTypesEnum } from "../enums/form-builder.enum"
import { TBlock } from "../types/form-builder.types"

const DEFAULT_BLOCKS: TBlock[] = [
    { id: "form_title", payload: { data: '', placeholder: '' }, type: BlockTypesEnum.FORM_TITLE },
]

type TBlocksStore = {
    blocks: TBlock[]
    editBlock: (block: TBlock) => void
    addBlock: (position: number) => void
    removeBlock: (blockId: string) => void
    updateBlock: ({ blockId, payload, type }: {
        blockId: string, payload?: { data: TBlock['payload']['data'] }, type?: TBlock['type']
    }) => void
}

export const useFormBuilderStore = create<TBlocksStore>()(devtools((set) => ({
    blocks: DEFAULT_BLOCKS,
    editBlock: (block) => set((state) => {
        const blockIndex = state.blocks.findIndex((b) => b.id === block.id)

        if (blockIndex === -1) {
            return state
        }

        const blocks = [...state.blocks]
        blocks[blockIndex] = block

        return { blocks }
    }),
    addBlock: (position) => set((state) => {
        const newBlock = {
            id: Math.random().toString(),
            payload: { data: '', placeholder: '' },
            type: BlockTypesEnum.TEXT,
        }

        const blocks = [...state.blocks]
        blocks.splice(position, 0, newBlock)

        return { blocks }
    }),
    removeBlock: (blockId) => set((state) => ({ blocks: state.blocks.filter(b => b.id !== blockId) })),
    updateBlock: ({ blockId, payload, type }) => set((state) => {
        const blockIndex = state.blocks.findIndex((b) => b.id === blockId)

        if (blockIndex === -1) {
            return state
        }

        const blocks = [...state.blocks]

        if (type) {
            blocks[blockIndex].type = type
        }

        if (payload) {
            blocks[blockIndex].payload = { placeholder: blocks[blockIndex].payload.placeholder, data: payload.data }
        }

        return { blocks }
    })
}), { enabled: true, name: "useFormBuilderStore" })) // TODO: @yesyash - Disable the devtools middleware in production
