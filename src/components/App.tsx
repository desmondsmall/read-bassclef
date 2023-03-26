import React, { useEffect, useReducer, useState, Fragment } from "react";
import { getRandomNotes, notesAreEqual } from "../utils/helpers";
import { INote } from "../utils/types";
import { optionsReducer, initialOptions } from "../reducers/options";
import { MusicStaff } from "./MusicStaff";
import { Analyser } from "./Analyser";
import { TiCog, TiInfoLarge, TiArrowBackOutline } from "react-icons/ti";

function App() {

	const [ userAudio, setUserAudio ] = useState<MediaStream | null>(null);
	const [ notePlaying, setNotePlaying ] = useState<INote | null>(null);
	const [ notesToPlay, setNotesToPlay ] = useState<INote[] | null>(null);
	const [ count, setCount ] = useState<number>(0);
	const [ options, setOptions ] = useReducer(optionsReducer, initialOptions);

	useEffect(() => {
		if (notePlaying && notesToPlay) {
			const noteToCheck = notesToPlay[count - 1];
			if (notesAreEqual(notePlaying, noteToCheck, options)) {
				handleCorrectNote();
			}
		}
	}, [ notePlaying ]);

	const connectAudio = async () => {
		const microphone = await navigator.mediaDevices.getUserMedia({
			audio: {
				echoCancellation: false,
				autoGainControl: false,
				noiseSuppression: false,
				latency: 0
			}
		});
		setUserAudio(microphone);
		start();
	};

	const start = () => {
		setCount(1);
		setNotesToPlay(getRandomNotes(4, options));
	};

	const stop = () => {
		setUserAudio(null);
		setNotePlaying(null);
		setNotesToPlay(null);
		setCount(0);
	};

	const simulateCorrectAnswer = () => {
		if (count + 1 <= 4) {
			setCount(count => count + 1);
		} else {
			start();
		}
	};

	const handleCorrectNote = () => {
		if (count + 1 <= 4) {
			setCount(count => count + 1);
		} else {
			start();
		}
	};

	return (
		<div className="app">
			<MusicStaff
				userAudio={ userAudio }
				notesToPlay={ notesToPlay }
				count={ count }
				options={ options }
			/>
			<TiCog onClick={ () => simulateCorrectAnswer() }/>
			<button onClick={ async () => connectAudio() } className="primary">
				Play
			</button>

			{ userAudio &&
				<Fragment>
					<Analyser
						userAudio={ userAudio }
						notePlaying={ notePlaying }
						setNotePlaying={ setNotePlaying }
					/>
					<TiArrowBackOutline onClick={ stop }/>
				</Fragment>
			}
		</div>
	);
}

export default App;
