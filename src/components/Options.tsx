/* eslint-disable no-useless-escape */
import React from "react";
import { EShowLabels, IOptions, EAccidentals, Action, } from "./../utils/types";
import { TiCog, TiInfoLarge, TiArrowBackOutline, TiTimes, TiTimesOutline } from "react-icons/ti";

interface Props {
    modalIsOpen: boolean;
    dispatchOptions: (arg: Action) => void;
    setModalIsOpen: (arg: boolean) => void;
    options: IOptions;
}

export const Options: React.FC<Props> = (props) => {

    const {
        options,
        dispatchOptions,
        modalIsOpen,
        setModalIsOpen,
    } = props;

    return(
            <section className={ `options ${ modalIsOpen ? `` : `hidden` } ` }>
				<header>
					<h1>Options</h1>
					<TiTimes className="icon" onClick={ () => setModalIsOpen(!modalIsOpen) } />
				</header>

				<div className="option">
					<h2>Accidentals</h2>
					<p>Only naturals are displayed by default. Add sharps or flats for more of a challenge.</p>
					<div className="button-group">
						<button
							className={ `${ options.accidentals.includes(EAccidentals.NATURALS) ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "toggleAccidental", accidental: EAccidentals.NATURALS }) }
							>
								Naturals
						</button>
						<button
							className={ `${ options.accidentals.includes(EAccidentals.SHARPS) ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "toggleAccidental", accidental: EAccidentals.SHARPS }) }
							>
								Sharps
						</button>
						<button
							className={ `${ options.accidentals.includes(EAccidentals.FLATS) ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "toggleAccidental", accidental: EAccidentals.FLATS }) }
							>
								Flats
						</button>
					</div>
				</div>

				<div className="option">
					<h2>Show Labels</h2>
					<p>Labels appear beneath the notes on the staff. When Correct only shows labels after the note's been played correctly.</p>
					<div className="button-group">
						<button
							className={ `${ options.showLabels === EShowLabels.WHENCORRECT ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "showLabels", label: EShowLabels.WHENCORRECT }) }
							>
								When Correct
						</button>
						<button
							className={ `${ options.showLabels === EShowLabels.ALWAYS ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "showLabels", label: EShowLabels.ALWAYS }) }
							>
								On
						</button>
						<button
							className={ `${ options.showLabels === EShowLabels.NEVER ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "showLabels", label: EShowLabels.NEVER }) }
							>
								Off
						</button>
					</div>
				</div>

				<div className="option">
					<h2>Detect Octaves </h2>
					<p>Check if notes are played in the correct octave in addition to being the correct note.</p>
					<div className="button-group">
						<button
							className={ `${ !options.detectOctaves ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "detectOctaves", octave: false }) }
							>
								Off
						</button>
						<button
							className={ `${ options.detectOctaves ? `active` : `` }` }
							onClick={ () => dispatchOptions({ type: "detectOctaves", octave: true }) }
							>
								On
						</button>
					</div>
				</div>
			</section>
    );
};
