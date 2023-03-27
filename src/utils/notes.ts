import { INote } from "./types";

export const naturals: INote[] = [
    {
        note: "E",
        octave: 1,
        notation: "E,,",
    },
    {
        note: "F",
        octave: 1,
        notation: "F,,",
    },
    {
        note: "G",
        octave: 1,
        notation: "G,,"
    },
    {
        note: "A",
        octave: 1,
        notation: "A,,"
    },
    {
        note: "B",
        octave: 1,
        notation: "B,,"
    },
    {
        note: "C",
        octave: 2,
        notation: "C,"
    },
    {
        note: "D",
        octave: 2,
        notation: "D,"
    },
    {
        note: "E",
        octave: 2,
        notation: "E,"
    },
    {
        note: "F",
        octave: 2,
        notation: "F,"
    },
    {
        note: "G",
        octave: 2,
        notation: "G,"
    },
    {
        note: "A",
        octave: 2,
        notation: "A,"
    },
    {
        note: "B",
        octave: 2,
        notation: "B,"
    },
    {
        note: "C",
        octave: 3,
        notation: "C"
    },
    {
        note: "D",
        octave: 3,
        notation: "D"
    },
    {
        note: "E",
        octave: 3,
        notation: "E"
    },
];

export const sharps: INote[] = [
    {
        note: "F♯",
        octave: 1,
        notation: "^F,,",
    },
    {
        note: "G♯",
        octave: 1,
        notation: "^G,,",
    },
    {
        note: "A♯",
        octave: 1,
        notation: "^A,,",
    },
    {
        note: "A♯",
        octave: 2,
        notation: "^A,",
    },
    {
        note: "F♯",
        octave: 2,
        notation: "^F,",
    },
    {
        note: "D♯",
        octave: 2,
        notation: "^D,",
    },
    {
        note: "D♯",
        octave: 3,
        notation: "^D",
    },
    {
        note: "G♯",
        octave: 2,
        notation: "^G,",
    },
    {
        note: "C♯",
        octave: 3,
        notation: "^C",
    },
    {
        note: "C♯",
        octave: 2,
        notation: "^C,",
    },
];

export const flats: INote[] = [
    {
        note: "G♭",
        octave: 1,
        notation: "_G,,",
    },
    {
        note: "A♭",
        octave: 1,
        notation: "_A,,",
    },
    {
        note: "B♭",
        octave: 1,
        notation: "_B,,",
    },
    {
        note: "B♭",
        octave: 2,
        notation: "_A,",
    },
    {
        note: "G♭",
        octave: 2,
        notation: "_G,",
    },
    {
        note: "E♭",
        octave: 2,
        notation: "_E,",
    },
    {
        note: "E♭",
        octave: 3,
        notation: "_E",
    },
    {
        note: "A♭",
        octave: 2,
        notation: "_A,",
    },
    {
        note: "D♭",
        octave: 3,
        notation: "_D",
    },
    {
        note: "D♭",
        octave: 2,
        notation: "_D,",
    },
];

export const rest: INote = {
    note: "rest",
    octave: 0,
    notation: "z"
};
