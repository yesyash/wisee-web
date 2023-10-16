import { BlockTypeEnum } from "../enums";

export type TBlock = {
  id: string;
  type: BlockTypeEnum;
  payload: {
    data: string;
    placeholder: string;
  };
};
