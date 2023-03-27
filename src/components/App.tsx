import React, { useEffect, useReducer, useState, Fragment } from "react";
import { getRandomNotes, notesAreEqual } from "../utils/helpers";
import { EAccidentals, INote } from "../utils/types";
import { optionsReducer, initialOptions } from "../reducers/options";
import { MusicStaff } from "./MusicStaff";
import { Analyser } from "./Analyser";
import { TiCog, TiInfoLarge, TiArrowBackOutline, TiTimes, TiTimesOutline } from "react-icons/ti";

function App() {

	const [ userAudio, setUserAudio ] = useState<MediaStream | null>(null);
	const [ notePlaying, setNotePlaying ] = useState<INote | null>(null);
	const [ notesToPlay, setNotesToPlay ] = useState<INote[] | null>(null);
	const [ count, setCount ] = useState<number>(0);
	const [ options, dispatchOptions ] = useReducer(optionsReducer, initialOptions);
	const [ modalIsOpen, setModalIsOpen ] = useState<boolean>(false);

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
		<main className="app">
			<MusicStaff
				userAudio={ userAudio }
				notesToPlay={ notesToPlay }
				count={ count }
				options={ options }
			/>
			<TiCog className="icon" onClick={ () => setModalIsOpen(state => !state) } />
			<button onClick={ async () => connectAudio() }>
				Play
			</button>
			<button onClick={ stop }>
				Stop
			</button>
			<button onClick={ simulateCorrectAnswer }>
				correct
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
			<section className={ `options ${ modalIsOpen ? `` : `hidden` } ` }>
				<header>
					<h1>Options</h1>
					<TiTimes className="icon" onClick={ () => setModalIsOpen(state => !state) } />
				</header>

				<div className="option">
					<h2>Accidentals</h2>
					<p>Only naturals are displayed by default. Add sharps or flats for more of a challenge.</p>
					<div className="button-group">
						<button
							className={ `${ options.accidentals.includes(EAccidentals.NATURALS) ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "toggleAccidental", value: EAccidentals.NATURALS }) }
							>
								Naturals
						</button>
						<button
							className={ `${ options.accidentals.includes(EAccidentals.SHARPS) ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "toggleAccidental", value: EAccidentals.SHARPS }) }
							>
								Sharps
						</button>
						<button
							className={ `${ options.accidentals.includes(EAccidentals.FLATS) ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "toggleAccidental", value: EAccidentals.FLATS }) }
							>
								Flats
						</button>
					</div>
				</div>
			</section>
		</main>
	);
}

export default App;
