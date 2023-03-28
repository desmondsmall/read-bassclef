import React, { useEffect, useReducer, useState, Fragment } from "react";
import { getRandomNotes, notesAreEqual } from "../utils/helpers";
import { INote } from "../utils/types";
import { optionsReducer, initialOptions } from "../reducers/options";
import { MusicStaff } from "./MusicStaff";
import { Analyser } from "./Analyser";
import { Options } from "./Options";
import { TiCog, TiInfoLarge, TiArrowBackOutline, TiTimes, TiTimesOutline } from "react-icons/ti";

function App() {

	const [ userAudio, setUserAudio ] = useState<MediaStream | null>(null);
	const [ notePlaying, setNotePlaying ] = useState<INote | null>(null);
	const [ notesToPlay, setNotesToPlay ] = useState<INote[] | null>(null);
	const [ options, dispatchOptions ] = useReducer(optionsReducer, initialOptions);
	const [ modalIsOpen, setModalIsOpen ] = useState<boolean>(false);
	const [ count, setCount ] = useState<number>(0);

	useEffect(() => {
		console.log(notePlaying);
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

	const handleCorrectNote = () => {
		if (count + 1 <= 4) {
			setCount(count => count + 1);
		} else {
			start();
		}
	};

	return (
		<main className="app">
			{ userAudio &&
				<Analyser
					userAudio={ userAudio }
					notePlaying={ notePlaying }
					setNotePlaying={ setNotePlaying }
				/>
			}
			<MusicStaff
				userAudio={ userAudio }
				notesToPlay={ notesToPlay }
				count={ count }
				options={ options }
			/>
			<button onClick={ async () => connectAudio() }>
				Play
			</button>
			<button onClick={ stop } className={ ` ${ userAudio ? "" : "hidden" }` }>
				Stop
			</button>
			<Options
				dispatchOptions={ dispatchOptions }
				options={ options }
				modalIsOpen={ modalIsOpen }
				setModalIsOpen={ setModalIsOpen }
			/>
			<div style={ { display: "flex", alignItems: "center" } }>
				<h3>Options</h3>
				<TiCog className="icon" onClick={ () => setModalIsOpen(state => !state) } />
			</div>
		</main>
	);
}

export default App;
