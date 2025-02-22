import { EAccidentals, EShowLabels, IOptions, Action } from "../utils/types";

export const initialOptions: IOptions = {
  accidentals: [ EAccidentals.NATURALS ],
  showLabels: EShowLabels.WHENCORRECT,
  detectOctaves: false,
  extendedRanges: [],
};

export const optionsReducer = (state: IOptions, action: Action) => {
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
    case "toggleExtendedRange": {
      const extendedRanges = [ ...state.extendedRanges ];
      const index = extendedRanges.findIndex(extendedRange => extendedRange === action.extendedRange);
      index != -1 ? extendedRanges.splice(index, 1) : extendedRanges.push(action.extendedRange);
        return {
            ...state,
            extendedRanges: extendedRanges,
        };
    }
  }
};
