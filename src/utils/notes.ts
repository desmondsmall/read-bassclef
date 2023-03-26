import { INote } from "./types";

export const naturals: INote[] = [
    {
        note: "E",
        octave: 2,
        notation: "E,,",
    },
    {
        note: "F",
        octave: 2,
        notation: "F,,",
    },
    {
        note: "G",
        octave: 2,
        notation: "G,,"
    },
    {
        note: "A",
        octave: 2,
        notation: "A,,"
    },
    {
        note: "B",
        octave: 2,
        notation: "B,,"
    },
    {
        note: "C",
        octave: 3,
        notation: "C,"
    },
    {
        note: "D",
        octave: 3,
        notation: "D,"
    },
    {
        note: "E",
        octave: 3,
        notation: "E,"
    },
    {
        note: "F",
        octave: 3,
        notation: "F,"
    },
    {
        note: "G",
        octave: 3,
        notation: "G,"
    },
    {
        note: "A",
        octave: 3,
        notation: "A,"
    },
    {
        note: "B",
        octave: 3,
        notation: "B,"
    },
    {
        note: "C",
        octave: 4,
        notation: "C"
    },
    {
        note: "D",
        octave: 4,
        notation: "D"
    },
    {
        note: "E",
        octave: 4,
        notation: "E"
    },
];

export const sharps: INote[] = [
    {
        note: "F♯",
        octave: 2,
        notation: "^F,,",
    },
    {
        note: "G♯",
        octave: 2,
        notation: "^G,,",
    },
    {
        note: "A♯",
        octave: 2,
        notation: "^A,,",
    },
    {
        note: "A♯",
        octave: 3,
        notation: "^A,",
    },
    {
        note: "F♯",
        octave: 3,
        notation: "^F,",
    },
    {
        note: "D♯",
        octave: 3,
        notation: "^D,",
    },
    {
        note: "D♯",
        octave: 4,
        notation: "^D",
    },
    {
        note: "G♯",
        octave: 3,
        notation: "^G,",
    },
    {
        note: "C♯",
        octave: 4,
        notation: "^C",
    },
    {
        note: "C♯",
        octave: 3,
        notation: "^C,",
    },
];

export const flats: INote[] = [
    {
        note: "G♭",
        octave: 2,
        notation: "_G,,",
    },
    {
        note: "A♭",
        octave: 2,
        notation: "_A,,",
    },
    {
        note: "B♭",
        octave: 2,
        notation: "_B,,",
    },
    {
        note: "B♭",
        octave: 3,
        notation: "_A,",
    },
    {
        note: "G♭",
        octave: 3,
        notation: "_G,",
    },
    {
        note: "E♭",
        octave: 3,
        notation: "_E,",
    },
    {
        note: "E♭",
        octave: 4,
        notation: "_E",
    },
    {
        note: "A♭",
        octave: 3,
        notation: "_A,",
    },
    {
        note: "D♭",
        octave: 4,
        notation: "_D",
    },
    {
        note: "D♭",
        octave: 3,
        notation: "_D,",
    },
];

export const rest: INote = {
    note: "rest",
    octave: 0,
    notation: "z"
};
