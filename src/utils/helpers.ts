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

const isDuplicateNote = (note1: INote, note2: INote, ignoreOctave: boolean): boolean => {
    const unisonOrOctave: boolean = (note1.note === note2.note) || (note1.note === transpose(note2.note));
    const sameOctave: boolean = (note1.octave === note2.octave);
    return ignoreOctave ? unisonOrOctave : (unisonOrOctave && sameOctave);
};

let previousNote: INote = naturals[0];

export const getRandomNotes = (n: number, options: IOptions): INote[] => {
    let timeoutLimit = 128;
    let notePool: INote[] = [];
    const randomNotes: INote[] = [];

    notePool = notePool.concat(sharps);
    notePool = notePool.concat(flats);
    notePool = notePool.concat(naturals);

    options.extendedRanges.forEach(extendedRange => {
        notePool = notePool.concat((extendedRange === EExtendedRange.LOWB) ? sharpsExtendedLow : sharpsExtendedHigh);
        notePool = notePool.concat((extendedRange === EExtendedRange.LOWB) ? flatsExtendedLow : flatsExtendedHigh);
        notePool = notePool.concat((extendedRange === EExtendedRange.LOWB) ? naturalsExtendedLow : naturalsExtendedHigh);
    });

    if (notePool?.length == 0)
        throw new Error('No notes to pick from!');

    while (randomNotes.length < n) {
        const randomInt = randomIntFromInterval(0, notePool.length - 1);
        const randomNote = notePool[randomInt];

        if (isDuplicateNote (randomNote, previousNote, !options.detectOctaves))
            continue;

        for (const accidental of options.accidentals) {
            if ((getAccidentalCharacterToRender(randomNote.note, options.key, randomNotes) == "" && accidental === EAccidentals.NONE)
                || (getAccidentalCharacterToRender(randomNote.note, options.key, randomNotes) == "♯" && accidental === EAccidentals.SHARPS)
                || (getAccidentalCharacterToRender(randomNote.note, options.key, randomNotes) == "♭" && accidental === EAccidentals.FLATS)
                || (getAccidentalCharacterToRender(randomNote.note, options.key, randomNotes) == "♮" && accidental === EAccidentals.NATURALS)){
                    randomNotes.push(randomNote);
                    previousNote = randomNote;
                    break;
                }
        }

        // FIXME: In some unfortunate combination of key signature, "Accidentals" settings and previous note,
        // the next note might be impossible to generate. Come up with some time-out behaviour.
        if (--timeoutLimit === 0)
        {
            console.debug("Could not generate enough notes");
            return [];
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
    "C major": [ "C", "D", "E", "F", "G", "A", "B" ],
    "G major": [ "G", "A", "B", "C", "D", "E", "F♯" ],
    "D major": [ "D", "E", "F♯", "G", "A", "B", "C♯" ],
    "A major": [ "A", "B", "C♯", "D", "E", "F♯", "G♯" ],
    "E major": [ "E", "F♯", "G♯", "A", "B", "C♯", "D♯" ],
    "B major": [ "B", "C♯", "D♯", "E", "F♯", "G♯", "A♯" ],
    "F♯ major": [ "F♯", "G♯", "A♯", "B", "C♯", "D♯", "E♯" ],
    "C♯ major": [ "C♯", "D♯", "E♯", "F♯", "G♯", "A♯", "B♯" ],
    "F major": [ "F", "G", "A", "B♭", "C", "D", "E" ],
    "B♭ major": [ "B♭", "C", "D", "E♭", "F", "G", "A" ],
    "E♭ major": [ "E♭", "F", "G", "A♭", "B♭", "C", "D" ],
    "A♭ major": [ "A♭", "B♭", "C", "D♭", "E♭", "F", "G" ],
    "D♭ major": [ "D♭", "E♭", "F", "G♭", "A♭", "B♭", "C" ],
    "G♭ major": [ "G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F" ],
    "C♭ major": [ "C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "B♭" ],
    "A minor": [ "A", "B", "C", "D", "E", "F", "G" ],
    "E minor": [ "E", "F♯", "G", "A", "B", "C", "D" ],
    "B minor": [ "B", "C♯", "D", "E", "F♯", "G", "A" ],
    "F♯ minor": [ "F♯", "G♯", "A", "B", "C♯", "D", "E" ],
    "C♯ minor": [ "C♯", "D♯", "E", "F♯", "G♯", "A", "B" ],
    "G♯ minor": [ "G♯", "A♯", "B", "C♯", "D♯", "E", "F♯" ],
    "D♯ minor": [ "D♯", "E♯", "F♯", "G♯", "A♯", "B", "C♯" ],
    "A♯ minor": [ "A♯", "B♯", "C♯", "D♯", "E♯", "F♯", "G♯" ],
    "D minor": [ "D", "E", "F", "G", "A", "B♭", "C" ],
    "G minor": [ "G", "A", "B♭", "C", "D", "E♭", "F" ],
    "C minor": [ "C", "D", "E♭", "F", "G", "A♭", "B♭" ],
    "F minor": [ "F", "G", "A♭", "B♭", "C", "D♭", "E♭" ],
    "B♭ minor": [ "B♭", "C", "D♭", "E♭", "F", "G♭", "A♭" ],
    "E♭ minor": [ "E♭", "F", "G♭", "A♭", "B♭", "C♭", "D♭" ],
    "A♭ minor": [ "A♭", "B♭", "C♭", "D♭", "E♭", "F♭", "G♭" ],
};

export const getRandomKey = (): string => {
    const keyNames = Object.keys(keys);
    return keyNames[randomIntFromInterval(0, keyNames.length - 1)];
};

const removeAccidental = (note: string): string => {
    return note.replace("♯", "").replace("♭", "").replace("♮", "");
};

const getNoteAccidental = (note: string): string => {
    return note.slice(1);
};

const abcAccidentals: Record<string, string> ={
    "": "",
    "♯": "^",
    "♭": "_",
    "♮": "=",
};

export const applyAccidentalToAbcNotatedNote = (abcNotatedNote: string, printableAccidentalCharacter: string): string => {
    const abcAccidentalCharacter = abcAccidentals[printableAccidentalCharacter];
    return abcAccidentalCharacter + abcNotatedNote.replace("_", "").replace("^", "");
};

export const getAccidentalCharacterToRender = (note: string, key: string, previousNotes: INote[]): string => {
    if (previousNotes?.length > 3)
        throw new Error('Unexpected amount of notes in the bar: ' + previousNotes?.length);

    let accidentalState = "";

    // The key will give us the initial state of accidental character
    for (const noteInScale of keys[key]) {
        if (removeAccidental (noteInScale) != removeAccidental(note))
            continue;

        accidentalState = getNoteAccidental(noteInScale);
        break;
    }

    // Figure out the state of accidental for a given note by the end of previousNotes sequence
    for (const previousNote of previousNotes)
    {
        if (removeAccidental (previousNote.note) != removeAccidental(note))
            continue;

        accidentalState = getNoteAccidental(previousNote.note);
    }

    // No accidental or accidental is already marked
    if (accidentalState === getNoteAccidental(note))
        return "";

    // Current note is natural, but an accidental was previously applied
    if (getNoteAccidental(note) === '')
        return "♮";

    // Note's accidental needs to be applied
    return getNoteAccidental(note);
};

export const printableKeySignatures: Record<string, string> = {
    //"Random": "Random",
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
