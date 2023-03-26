import React, { useEffect, useReducer, useState, Fragment } from "react";
import { getRandomNotes, notesAreEqual } from "../utils/helpers";
import { INote } from "../utils/types";
import { optionsReducer, initialOptions } from "../reducers/options";
import { naturals, sharps, flats } from "../utils/notes";
import { MusicStaff } from "./MusicStaff";
import { Analyser } from "./Analyser";
import { TiCog, TiInfoLarge, TiArrowBackOutline } from "react-icons/ti";

function App() {

	const [ userAudio, setUserAudio ] = useState<MediaStream>();
	const [ notePlaying, setNotePlaying ] = useState<INote | null>(null);
	const [ notesToPlay, setNotesToPlay ] = useState<INote[]>([ sharps[1], naturals[6], flats[2], naturals[6] ]);
	const [ count, setCount ] = useState<number>(0);
	const [ options, setOptions ] = useReducer(optionsReducer, initialOptions);


	useEffect(() => {
		if (notePlaying != null) {
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
		const notes = getRandomNotes(4, options);
		setCount(count => count + 1);
		setNotesToPlay(notes);
	};

	const stop = () => {
		setUserAudio(undefined);
		setNotePlaying(null);
		setNotesToPlay([ sharps[1], naturals[6], flats[2], naturals[6] ]);
		setCount(0);
	};

	const simulateCorrectAnswer = () => {
		if (count + 1 <= 4) {
			setCount(count => count + 1);
		} else {
			setCount(0);
			start();
		}
	};

	const handleCorrectNote = () => {
		if (count + 1 <= 4) {
			setCount(count => count + 1);
		} else {
			setCount(0);
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
