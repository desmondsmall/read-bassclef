export interface INote {
    note: string;
    octave: number;
    notation: string;
}

export interface IOptions {
    accidentals: EAccidentals[];
    showLabels: EShowLabels;
    detectOctaves: boolean;
    extendedRanges: EExtendedRange[];
    key: string;
}

export enum EModal {
     OPTIONS,
     INFO,
     HIDDEN,
}

export type Action =
     | { type: "toggleAccidental", accidental: EAccidentals }
     | { type: "showLabels", label: EShowLabels }
     | { type: "detectOctaves", octave: boolean }
     | { type: "toggleExtendedRange", extendedRange: EExtendedRange }
     | { type: "changeKey", key: string }

export enum EAccidentals {
     SHARPS = "Sharps",
     FLATS = "Flats",
     NATURALS = "Naturals",
     NONE = "None",
}

export enum EShowLabels {
     ALWAYS = "Always",
     NEVER = "Never",
     WHENCORRECT = "WhenCorrect",
}

export enum EExtendedRange {
     LOWB = "LowB",
     HIGHC = "HighC",
}
