import { EAccidentals, EShowLabels, IOptions } from "../utils/types";

export const initialOptions: IOptions = {
  accidentals: [ EAccidentals.NATURALS ],
  showLabels: EShowLabels.WHENCORRECT,
  ignoreOctaves: true,
};

export const optionsReducer = (state: IOptions, action: any) => {
  switch (action.type) {
      default: return state;
  }
  throw Error("Unknown action: " + action.type);
};
