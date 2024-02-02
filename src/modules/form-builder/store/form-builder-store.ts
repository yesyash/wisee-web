import { nanoid } from "nanoid";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

import { BlockTypesEnum } from "../enums/form-builder.enum";
import { TBlock } from "../types/form-builder.types";

const FORM_BUILDER_STORE_KEY = "form-builder";

const DEFAULT_FORM_TITLE: () => TBlock = () => ({
  id: nanoid(),
  payload: { data: "", placeholder: "Form title" },
  type: BlockTypesEnum.FORM_TITLE,
});

const DEFAULT_NEW_BLOCK: () => TBlock = () => ({
  id: nanoid(),
  payload: { data: "", placeholder: "Type / to see options..." },
  type: BlockTypesEnum.TEXT,
});

export type TBlocksStore = {
  blocks: TBlock[];
  editBlock: (block: TBlock) => void;
  addBlock: (position: number) => void;
  removeBlock: (blockId: string) => void;
  updateBlock: ({
    blockId,
    payload,
    type,
  }: {
    blockId: string;
    payload?: { data: TBlock["payload"]["data"] };
    type?: TBlock["type"];
  }) => void;
};

export const useFormBuilderStore = create<TBlocksStore>()(
  persist(
    devtools(
      (set) => ({
        blocks: [DEFAULT_FORM_TITLE()],
        editBlock: (block) =>
          set((state) => {
            const blockIndex = state.blocks.findIndex((b) => b.id === block.id);

            if (blockIndex === -1) {
              return state;
            }

            const blocks = [...state.blocks];
            blocks[blockIndex] = block;

            return { blocks };
          }),
        addBlock: (position) =>
          set((state) => {
            const blocks = [...state.blocks];
            blocks.splice(position, 0, DEFAULT_NEW_BLOCK());

            return { blocks };
          }),
        removeBlock: (blockId) => set((state) => ({ blocks: state.blocks.filter((b) => b.id !== blockId) })),
        updateBlock: ({ blockId, payload, type }) =>
          set((state) => {
            const blockIndex = state.blocks.findIndex((b) => b.id === blockId);

            if (blockIndex === -1) {
              return state;
            }

            const blocks = [...state.blocks];

            if (type) {
              blocks[blockIndex].type = type;
            }

            if (payload) {
              blocks[blockIndex].payload = { placeholder: blocks[blockIndex].payload.placeholder, data: payload.data };
            }

            return { blocks };
          }),
      }),
      { enabled: true, name: "useFormBuilderStore" },
    ),
    { name: FORM_BUILDER_STORE_KEY, storage: createJSONStorage(() => localStorage) }, // TODO @yesyash - add versioning and migration
  ),
); // TODO: @yesyash - Disable the devtools middleware in production
