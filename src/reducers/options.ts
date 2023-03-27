import { EAccidentals, EShowLabels, IOptions } from "../utils/types";

export const initialOptions: IOptions = {
  accidentals: [ EAccidentals.NATURALS ],
  showLabels: EShowLabels.WHENCORRECT,
  ignoreOctaves: true,
};

export const optionsReducer = (state: IOptions, action: any) => {
  switch (action.type) {
    case "toggleAccidental": {
      const accidentals = [ ...state.accidentals ];
      const index = accidentals.findIndex(accidental => accidental === action.value);
      index != -1 ? accidentals.splice(index, 1) : accidentals.push(action.value);
      console.log(accidentals);
        return {
            ...state,
            accidentals: accidentals,
        };
      break;
    }
    default: return state;
  }
  throw Error("Unknown action: " + action.type);
};
