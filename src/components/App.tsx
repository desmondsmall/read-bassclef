import React, { useEffect, useReducer, useState } from "react";
import { optionsReducer, initialOptions } from "../reducers/optionsReducer";
import { getRandomNotes, notesAreEqual } from "../utils/helpers";
import { TiCog, TiInfoLarge } from "react-icons/ti";
import { EModal, INote } from "../utils/types";
import { MusicStaff } from "./MusicStaff";
import { Analyser } from "./Analyser";
import { Options } from "./Options";
import { Info } from "./Info";

export const App: React.FC = () => {

	const [ options, dispatchOptions ] = useReducer(optionsReducer, initialOptions);
	const [ notesToPlay, setNotesToPlay ] = useState<INote[] | null>(null);
	const [ userAudio, setUserAudio ] = useState<MediaStream | null>(null);
	const [ notePlaying, setNotePlaying ] = useState<INote | null>(null);
	const [ modal, setModal ] = useState<EModal>(EModal.HIDDEN);
	const [ error, setError ] = useState<boolean>(false);
	const [ count, setCount ] = useState<number>(0);

	useEffect(() => {
		if (notePlaying && notesToPlay) {
			const noteToCheck = notesToPlay[count - 1];
			if (notesAreEqual(notePlaying, noteToCheck, options)) {
				count + 1 <= 4
					? setCount(count => count + 1)
					: reset();
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
			setError(false);
			reset();
		} catch (err) {
			setError(true);
		}
	};

	const stop = () => {
		setUserAudio(null);
		setNotePlaying(null);
		setNotesToPlay(null);
		setCount(0);
	};

	const reset = () => {
		setCount(1);
		setNotesToPlay(getRandomNotes(4, options));
	};

	return (
		<main className="app">
			{userAudio ?
				<Analyser
					userAudio={ userAudio }
					notePlaying={ notePlaying }
					setNotePlaying={ setNotePlaying }
				/>
            :
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
			{!userAudio ?
				<div className="intro">
					<p className="description">Plug your bass into an audio interface or put a mic/phone next to your amp and start playing!</p>
					<button onClick={ async () => connectAudio() } className="play">Play</button>
				</div>
            :
				<button className="play" onClick={ stop }>
					Stop
				</button>
			}
			{error &&
				<div className="error-message">
					<p>
						There was an error connecting your audio.<br />
						You might have to close and re-open your browser. <br />
						Make sure to hit accept!
					</p>
					<button onClick={ () => setError(false) }>x</button>
				</div>
			}
			<Info
				modal={ modal }
				setModal={ setModal }
			/>
			<Options
				dispatchOptions={ dispatchOptions }
				options={ options }
				modal={ modal }
				setModal={ setModal }
			/>
			<div className="link-group">
				<TiInfoLarge
					className="icon"
					onClick={ () => setModal(EModal.INFO) }
				/>
				<TiCog
					className="icon"
					onClick={ () => setModal(EModal.OPTIONS) }
				/>
			</div>
		</main>
	);
};

export default App;
