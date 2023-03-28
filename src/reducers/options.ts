import { EAccidentals, EShowLabels, IOptions, IAction } from "../utils/types";

export const initialOptions: IOptions = {
  accidentals: [ EAccidentals.NATURALS ],
  showLabels: EShowLabels.WHENCORRECT,
  detectOctaves: false,
};

export const optionsReducer = (state: IOptions, action: IAction) => {
  switch (action.type) {
    case "toggleAccidental": {
      const accidentals = [ ...state.accidentals ];
      const index = accidentals.findIndex(accidental => accidental === action.accidental);
      index != -1 ? accidentals.splice(index, 1) : accidentals.push(action.accidental);
        return {
            ...state,
            accidentals: accidentals,
        };
    }
    case "showLabels": {
        return {
            ...state,
            showLabels: action.label,
        };
    }
    case "detectOctaves": {
        return {
            ...state,
            detectOctaves: action.octave ?? false,
        };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
};
