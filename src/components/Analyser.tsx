
import React, { useState } from "react";
import Pitchfinder from "pitchfinder";
import useInterval from "../hooks/useInterval";
import { frequencyToNote } from "../utils/helpers";
import { INote } from "../utils/types";

interface Props {
    userAudio: MediaStream;
    notePlaying: INote | null;
    setNotePlaying: (arg: INote | null) => void;
}

export const Analyser: React.FC<Props> = (props: Props) => {

    const {
        userAudio,
        notePlaying,
        setNotePlaying,
    } = props;

    const [ context ] = useState<AudioContext>(new window.AudioContext());
    const [ stream ] = useState<MediaStreamAudioSourceNode>(context.createMediaStreamSource(userAudio));
    const [ analyser ] = useState<AnalyserNode>(context.createAnalyser());

    stream.connect(analyser);

    const detectPitch = Pitchfinder.AMDF({
        sampleRate: context.sampleRate,
        minFrequency: 30,
        maxFrequency: 530,
        sensitivity: 0.05,
    });

    useInterval(() => {
        const array32 = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(array32);
        setNotePlaying(frequencyToNote(detectPitch(array32)));
    }, userAudio && analyser ? 500 : null);

    return (
        <div className="note-playing">
            { notePlaying
                ? <span>{ notePlaying.note + notePlaying.octave }</span>
                : <span>-</span>
            }
        </div>
    );
};
