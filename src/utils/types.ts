export interface INote {
    note: string;
    octave: number;
    notation: string;
}

export interface IOptions {
    accidentals: EAccidentals[];
    showLabels: EShowLabels;
    detectOctaves: boolean;
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

export enum EAccidentals {
     SHARPS = "Sharps",
     FLATS = "Flats",
     NATURALS = "Naturals",
}

export enum EShowLabels {
     ALWAYS = "Always",
     NEVER = "Never",
     WHENCORRECT = "WhenCorrect",
}
