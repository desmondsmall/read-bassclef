import { EAccidentals, INote, IOptions } from "./types";
import { naturals, sharps, flats } from "./notes";

export const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const frequencyToNote = (freq: number | null): INote | null => {
    if (freq === null || freq < 30 || freq > 530) {
        return null;
    }

    const notes = [ "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B" ];
    const c0 = 440.0 * Math.pow(2.0, -4.75);
    const halfStepsBelowMiddleC = Math.round(12.0 * Math.log2(freq / c0));
    const octave = Math.floor(halfStepsBelowMiddleC / 12.0);
    const note = notes[Math.floor(halfStepsBelowMiddleC % 12)];

    return {
        note: note,
        octave: octave,
        notation: "",
    };
};

export const getRandomNotes = (n: number, options: IOptions): INote[] => {
    let notePool: INote[] = [];
    const randomNotes: INote[] = [];

    for (let i = 0; i < n; i++) {
        switch (options.accidentals) {
            case EAccidentals.BOTH:
                notePool = naturals.concat(sharps).concat(flats);
                break;
            case EAccidentals.SHARPS:
                notePool = naturals.concat(sharps);
                break;
            case EAccidentals.FLATS:
                notePool = naturals.concat(flats);
                break;
            case EAccidentals.NONE:
                notePool = naturals;
                break;
        }

        const randomInt = randomIntFromInterval(0, notePool.length - 1);
        randomNotes.push(notePool[randomInt]);
    }

    return randomNotes;
};

export const notesAreEqual = (note1: INote, note2: INote, options: IOptions): boolean => {
    if (options.ignoreOctaves) {
        return note1.note === note2.note;
    } else {
        return note1.note === note2.note && note1.octave === note2.octave;
    }
};
