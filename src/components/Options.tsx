import React from "react";
import { EShowLabels, IOptions, EAccidentals, EExtendedRange, Action, EModal, } from "./../utils/types";
import { TiTimes } from "react-icons/ti";

interface Props {
	modal: EModal;
	dispatchOptions: (arg: Action) => void;
	setModal: (arg: EModal) => void;
	options: IOptions;
}

export const Options: React.FC<Props> = (props) => {

	const {
		options,
		dispatchOptions,
		modal,
		setModal,
	} = props;

	if (modal === EModal.OPTIONS) {
		return (
			<section className="modal">
				<div className="modal--wrapper">
					<div className="header">
						<h1>Options</h1>
						<TiTimes className="icon" onClick={ () => setModal(EModal.HIDDEN) } />
					</div>

					<div className="option">
						<div className="label">
							<h2>Show Labels</h2>
							<p>Note labels appear below the staff. Correct shows notes only after they've been played.</p>
						</div>
						<div className="button-group">
							<button
								className={ `${options.showLabels === EShowLabels.WHENCORRECT ? `active` : ``}` }
								onClick={ () => dispatchOptions({ type: "showLabels", label: EShowLabels.WHENCORRECT }) }
							>
								Correct
							</button>
							<button
								className={ `${options.showLabels === EShowLabels.ALWAYS ? `active` : ``}` }
								onClick={ () => dispatchOptions({ type: "showLabels", label: EShowLabels.ALWAYS }) }
							>
								On
							</button>
							<button
								className={ `${options.showLabels === EShowLabels.NEVER ? `active` : ``}` }
								onClick={ () => dispatchOptions({ type: "showLabels", label: EShowLabels.NEVER }) }
							>
								Off
							</button>
						</div>
					</div>
					<div className="option">
						<div className="label">
							<h2>Accidentals</h2>
							<p>Add any combination of naturals, flats or sharps.</p>
						</div>
						<div className="button-group">
							<button
								className={ `${options.accidentals.includes(EAccidentals.NATURALS) ? `active` : ``}` }
								onClick={ () => dispatchOptions({ type: "toggleAccidental", accidental: EAccidentals.NATURALS }) }
							>
								Naturals
							</button>
							<button
								className={ `${options.accidentals.includes(EAccidentals.SHARPS) ? `active` : ``}` }
								onClick={ () => dispatchOptions({ type: "toggleAccidental", accidental: EAccidentals.SHARPS }) }
							>
								Sharps
							</button>
							<button
								className={ `${options.accidentals.includes(EAccidentals.FLATS) ? `active` : ``}` }
								onClick={ () => dispatchOptions({ type: "toggleAccidental", accidental: EAccidentals.FLATS }) }
							>
								Flats
							</button>
						</div>
					</div>

					<div className="option">
						<div className="label">
							<h2>Detect Octaves </h2>
							<p>Check if notes are played in the correct octave in addition to being the correct note.</p>
						</div>
						<div className="button-group">
							<button
								className={ `${!options.detectOctaves ? `active` : ``}` }
								onClick={ () => dispatchOptions({ type: "detectOctaves", octave: false }) }
							>
								Off
							</button>
							<button
								className={ `${options.detectOctaves ? `active` : ``}` }
								onClick={ () => dispatchOptions({ type: "detectOctaves", octave: true }) }
							>
								On
							</button>
						</div>
					</div>
					
					<div className="option">
						<div className="label">
							<h2>Extended Range</h2>
							<p>Include extra notes available on five- and six-string basses.</p>
						</div>
						<div className="button-group">
							<button
								className={ `${options.extendedRanges.includes(EExtendedRange.LOWB) ? `active` : ``}` }
								onClick={ () => dispatchOptions({ type: "toggleExtendedRange", extendedRange: EExtendedRange.LOWB }) }
							>
								Low B String
							</button>
							<button
								className={ `${options.extendedRanges.includes(EExtendedRange.HIGHC) ? `active` : ``}` }
								onClick={ () => dispatchOptions({ type: "toggleExtendedRange", extendedRange: EExtendedRange.HIGHC }) }
							>
								High C String
							</button>
						</div>
					</div>

				</div>
			</section>
		);
	}

	return null;
};
