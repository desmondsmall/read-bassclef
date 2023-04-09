import React, { useEffect, useReducer, useState } from "react";
import { getRandomNotes, notesAreEqual } from "../utils/helpers";
import { EModal, INote } from "../utils/types";
import { optionsReducer, initialOptions } from "../reducers/options";
import { MusicStaff } from "./MusicStaff";
import { Analyser } from "./Analyser";
import { Options } from "./Options";
import { TiCog, TiInfoLarge } from "react-icons/ti";

function App() {

	const [ userAudio, setUserAudio ] = useState<MediaStream | null>(null);
	const [ notePlaying, setNotePlaying ] = useState<INote | null>(null);
	const [ notesToPlay, setNotesToPlay ] = useState<INote[] | null>(null);
	const [ options, dispatchOptions ] = useReducer(optionsReducer, initialOptions);
	const [ modal, setModal ] = useState<EModal>(EModal.HIDDEN);
	const [ count, setCount ] = useState<number>(0);
	const [ error, setError ] = useState<boolean>(false);

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
		try {
			const microphone = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: false,
					autoGainControl: false,
					noiseSuppression: false,
				},
				video: false,
			});
			setUserAudio(microphone);
			start();
			setError(false);
		} catch(err) {
			setError(true);
		}
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

			{ !userAudio &&
				<header>
					<h2>Learn to Read</h2>
					<h1>Bass Clef</h1>
				</header>
			}
			<MusicStaff
				userAudio={ userAudio }
				notesToPlay={ notesToPlay }
				count={ count }
				options={ options }
			/>
			{ !userAudio ?
				<div className="intro">
					<p className="description">Plug your bass into an audio interace or put your mic/phone by your amp and crank it!</p>
					<button onClick={ async () => connectAudio() } className="play">
						Play
					</button>
				</div>
			:
				<button onClick={ stop }>
					Stop
				</button>
			}
			{ error &&
				<div className="error-message">
					<p>
						There was an error connecting your audio.<br/>
						You might have to close and re-open your browser. <br/>
						Make sure to hit accept!
					</p>
					<button onClick={ () => setError(false) }>x</button>
				</div>
			}
			<Options
				dispatchOptions={ dispatchOptions }
				options={ options }
				modal={ modal }
				setModal={ setModal }
			/>
			<div className="link-group">
				<TiInfoLarge className="icon" onClick={ () => setModal(EModal.INFO) }/>
				<TiCog className="icon" onClick={ () => setModal(EModal.OPTIONS) }/>
			</div>
		</main>
	);
}

export default App;
