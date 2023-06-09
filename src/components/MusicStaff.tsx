/* eslint-disable no-useless-escape */
import React, { useEffect, useRef } from "react";
import { rest, naturals, sharps, flats } from "../utils/notes";
import { EShowLabels, INote, IOptions } from "./../utils/types";
import abcjs from "abcjs";

interface Props {
    notesToPlay: INote[] | null;
    userAudio: MediaStream | null;
    count: number;
    options: IOptions;
}

export const MusicStaff: React.FC<Props> = (props) => {

    const {
        notesToPlay,
        userAudio,
        count,
        options,
    } = props;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const div = useRef<any>();
    const bar = "L: 1/4 \n K: clef=bass \n";
    const displayNotes = [ sharps[1], naturals[6], flats[2], naturals[6] ];

    useEffect(() => {
        abcjs.renderAbc(div.current, bar + renderNotation(notesToPlay ?? displayNotes), {
            add_classes: true,
            responsive: "resize",
            staffwidth: 200,
        });
        const el = div.current.querySelector(`.abcjs-n${ count - 1 }`);
        if (el) el.style.color = "#141414";
    }, [ notesToPlay, count ]);

    const renderNotation = (notes: INote[]) => {
        let notation = "";
        notes?.forEach((note, index) => {
            if (index < count && userAudio ) {
                switch (options.showLabels) {
                    case EShowLabels.ALWAYS:
                        notation += `\"_${ note.note }${ options.detectOctaves ? note.octave : "" }\"${ note.notation }`;
                        break;
                    case EShowLabels.WHENCORRECT:
                        notation += index + 1 != count ? `\"_${ note.note }${ options.detectOctaves ? note.octave : "" }\"${ note.notation }` : `\"_?\"${ note.notation }`;
                        break;
                    case EShowLabels.NEVER:
                        notation += note.notation;
                }
            } else if (userAudio) {
                notation += rest.notation;
            } else {
                notation += note.notation;
            }
        });

        return notation;
    };

    return (
        <div className="music-staff-container">
            <div className="music-staff" ref={ div } />
        </div>
    );
};
