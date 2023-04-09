import React from "react";
import { EModal } from "./../utils/types";
import { TiTimes } from "react-icons/ti";

interface Props {
    modal: EModal;
    setModal: (arg: EModal) => void;
}

export const Info: React.FC<Props> = (props) => {

    const {
        modal,
        setModal,
    } = props;

	if (modal === EModal.INFO) {
        return(
            <section className="modal">
                <div className="modal--wrapper">
                    <div className="header">
                        <h1>Welcome!</h1>
                        <TiTimes className="icon" onClick={ () => setModal(EModal.HIDDEN) } />
                    </div>
                    <div className="info">
                        <p>
                            This is a tool for learning to read bass clef. For best results use an audio interface.
                            I haven't tested it much with phones/mics but it seems to work fine.
                        </p>
                        <p>
                            I made a similar tool <a href="https://bassfretboard.com/" target="_blank" rel="noreferrer">here</a>.
                            You can check out the code on <a href="https://github.com/desmondsmall/read-bassclef" target="_blank" rel="noreferrer">github</a>.
                            Feel free to email me at desmond at fastmail dot com with any questions or comments
                        </p>
                        <p>
                            Thanks for visiting! 🙂
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return null;
};
