import { BlockTypeEnum } from "../enums/form-builder.enum";

export type TBlock = {
  id: string;
  type: BlockTypeEnum;
  payload: {
    data: string;
    placeholder: string;
  };
};
