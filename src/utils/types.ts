export interface INote {
    note: string;
    octave: number;
    notation: string;
}

export interface IOptions {
    accidentals: EAccidentals[];
    showLabels: EShowLabels;
    ignoreOctaves: boolean;
}

export enum EActionTypes {
     ACCIDENTALS = "Accidentals",
     LABELS = "Labels",
}

export enum EAccidentals {
     SHARPS = "Sharps",
     FLATS = "Flats",
     NATURALS = "Naturals",
}

export enum EShowLabels {
     ALWAYS = "Always",
     NEVER = "Never",
     WHENCORRECT = "WhenCorrect",
     NONE = "None",
}
