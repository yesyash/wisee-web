import { BlockTypesEnum } from "../enums/form-builder.enum";

export type TBlock = {
  id: string;
  type: BlockTypesEnum;
  payload: {
    data: string;
    placeholder?: string;
  };
};
