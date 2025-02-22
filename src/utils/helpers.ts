import { EAccidentals, EExtendedRange, INote, IOptions } from "./types";
import { naturals, sharps, flats } from "./notes";
import { naturalsExtendedLow, sharpsExtendedLow, flatsExtendedLow } from "./notes";
import { naturalsExtendedHigh, sharpsExtendedHigh, flatsExtendedHigh } from "./notes";

export const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const transpose = (note: string) => {
    const range = [ "F", "G", "A", "B", "C", "D", "E", "F", "G" ];
    const letter = note.slice(0, 1);
    const index = range.indexOf(letter);

    if (note.includes("♭")) {
        return note.replace(letter + "♭", range[index - 1] + "♯");
    }

    if (note.includes("♯")) {
        return note.replace(letter + "♯", range[index + 1] + "♭");
    }

    return note;
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

    options.accidentals?.forEach(accidental => {
        switch (accidental) {
            case EAccidentals.SHARPS:
                notePool = notePool.concat(sharps);
                options.extendedRanges.forEach(extendedRange => {
                    notePool = notePool.concat(
                        (extendedRange === EExtendedRange.LOWB) ? sharpsExtendedLow : sharpsExtendedHigh
                    );
                });
                break;

            case EAccidentals.FLATS:
                notePool = notePool.concat(flats);
                options.extendedRanges.forEach(extendedRange => {
                    notePool = notePool.concat(
                        (extendedRange === EExtendedRange.LOWB) ? flatsExtendedLow : flatsExtendedHigh
                    );
                });
                break;

            case EAccidentals.NATURALS:
                notePool = notePool.concat(naturals);
                options.extendedRanges.forEach(extendedRange => {
                    notePool = notePool.concat(
                        (extendedRange === EExtendedRange.LOWB) ? naturalsExtendedLow : naturalsExtendedHigh
                    );
                });
                break;
        }
    });

    if (notePool?.length === 0) notePool = naturals;

    while (randomNotes.length < n) {
        const randomInt = randomIntFromInterval(0, notePool.length - 1);
        const randomNote = notePool[randomInt];
        if (!randomNotes.find(x => x.note === randomNote.note)) {
            randomNotes.push(notePool[randomInt]);
        }
    }

    return randomNotes;
};

export const notesAreEqual = (notePlaying: INote, noteToCheck: INote, options: IOptions): boolean => {
    const equalNote: boolean = notePlaying.note === noteToCheck.note || transpose(notePlaying.note) === noteToCheck.note;
    const equalOctave: boolean = notePlaying.octave === noteToCheck.octave;

    if (options.detectOctaves) {
        return equalNote && equalOctave;
    } else {
        return equalNote;
    }
};
