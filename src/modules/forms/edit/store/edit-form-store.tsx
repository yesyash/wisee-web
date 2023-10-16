import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { BlockTypeEnum } from "../enums"
import { TBlock } from "../types/edit-form-types"

const DEFAULT_BLOCKS: TBlock[] = [
    { id: "form_title", payload: { data: '', placeholder: '' }, type: BlockTypeEnum.FORM_TITLE },
]

type TBlocksStore = {
    blocks: TBlock[]
    editBlock: (block: TBlock) => void
    addBlock: (position: number) => void
    removeBlock: (blockId: string) => void
    updateBlock: (blockId: string, payload: TBlock['payload']) => void
}

export const useEditFormStore = create<TBlocksStore>()(devtools((set) => ({
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
            type: BlockTypeEnum.TEXT,
        }

        const blocks = [...state.blocks]
        blocks.splice(position, 0, newBlock)

        return { blocks }
    }),
    removeBlock: (blockId) => set((state) => ({ blocks: state.blocks.filter(b => b.id !== blockId) })),
    updateBlock: (blockId, payload) => set((state) => {
        const blockIndex = state.blocks.findIndex((b) => b.id === blockId)

        if (blockIndex === -1) {
            return state
        }

        const blocks = [...state.blocks]
        blocks[blockIndex].payload = payload

        return { blocks }
    })
}), { enabled: true, name: "useFormStore" })) // TODO: @yesyash - Disable the devtools middleware in production
