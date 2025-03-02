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

const keys: Record<string, string[]> = {
    "C major": ["C", "D", "E", "F", "G", "A", "B"],
    "G major": ["G", "A", "B", "C", "D", "E", "F♯"],
    "D major": ["D", "E", "F♯", "G", "A", "B", "C♯"],
    "A major": ["A", "B", "C♯", "D", "E", "F♯", "G♯"],
    "E major": ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"],
    "B major": ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯"],
    "F♯ major": ["F♯", "G♯", "A♯", "B", "C♯", "D♯", "E♯"],
    "C♯ major": ["C♯", "D♯", "E♯", "F♯", "G♯", "A♯", "B♯"],
    "F major": ["F", "G", "A", "B♭", "C", "D", "E"],
    "B♭ major": ["B♭", "C", "D", "E♭", "F", "G", "A"],
    "E♭ major": ["E♭", "F", "G", "A♭", "B♭", "C", "D"],
    "A♭ major": ["A♭", "B♭", "C", "D♭", "E♭", "F", "G"],
    "D♭ major": ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"],
    "G♭ major": ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F"],
    "C♭ major": ["C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "B♭"],
    "A minor": ["A", "B", "C", "D", "E", "F", "G"],
    "E minor": ["E", "F♯", "G", "A", "B", "C", "D"],
    "B minor": ["B", "C♯", "D", "E", "F♯", "G", "A"],
    "F♯ minor": ["F♯", "G♯", "A", "B", "C♯", "D", "E"],
    "C♯ minor": ["C♯", "D♯", "E", "F♯", "G♯", "A", "B"],
    "G♯ minor": ["G♯", "A♯", "B", "C♯", "D♯", "E", "F♯"],
    "D♯ minor": ["D♯", "E♯", "F♯", "G♯", "A♯", "B", "C♯"],
    "A♯ minor": ["A♯", "B♯", "C♯", "D♯", "E♯", "F♯", "G♯"],
    "D minor": ["D", "E", "F", "G", "A", "B♭", "C"],
    "G minor": ["G", "A", "B♭", "C", "D", "E♭", "F"],
    "C minor": ["C", "D", "E♭", "F", "G", "A♭", "B♭"],
    "F minor": ["F", "G", "A♭", "B♭", "C", "D♭", "E♭"],
    "B♭ minor": ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭"],
    "E♭ minor": ["E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭"],
    "A♭ minor": ["A♭", "B♭", "C♭", "D♭", "E♭", "F♭", "G♭"],
};

const validNotes = new Set<string>([
    "C", "D", "E", "F", "G", "A", "B",
    "C♯", "D♯", "E♯", "F♯", "G♯", "A♯", "B♯",
    "C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "B♭"
]);

export const isInKey = (note: string, key: string): boolean => {
    if (!(key in keys)) throw new Error(`Invalid key: ${key}`);
    if (!validNotes.has(note)) throw new Error(`Invalid note: ${note}`);
    return keys[key].includes(note);
};

export const printableKeySignatures: Record<string, string> = {
    "Random": "Random",
    "C major / A minor (no sharps or flats)": "C major",
    "G major / E minor (♯)": "G major",
    "D major / B minor (♯♯)": "D major",
    "A major / F♯ minor (♯♯♯)": "A major",
    "E major / C♯ minor (♯♯♯♯)": "E major",
    "B major / G♯ minor (♯♯♯♯♯)": "B major",
    "F♯ major / D♯ minor (♯♯♯♯♯♯)": "F♯ major",
    "C♯ major / A♯ minor (♯♯♯♯♯♯♯)": "C♯ major",
    "F major / D minor (♭)": "F major",
    "B♭ major / G minor (♭♭)": "B♭ major",
    "E♭ major / C minor (♭♭♭)": "E♭ major",
    "A♭ major / F minor (♭♭♭♭)": "A♭ major",
    "D♭ major / B♭ minor (♭♭♭♭♭)": "D♭ major",
    "G♭ major / E♭ minor (♭♭♭♭♭♭)": "G♭ major",
    "C♭ major / A♭ minor (♭♭♭♭♭♭♭)": "C♭ major"
};
