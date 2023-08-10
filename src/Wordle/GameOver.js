import React from "react";

export default function GameOver(props) {
    return (
        <div className="gameover">
            <h1>{props.win ? "WIN" : "LOSE"}</h1>
            <h4 id="one">{props.win ? "YOU GUESSED THE WORD CORRECTLY!" : "SORRY YOU COULD NOT GUESS THE WORD"}</h4>
            <h4 id="one">THE CORRECT WORD WAS: <span className="secretWord">{props.word.toUpperCase()}</span></h4>
            <button className="restart" onClick={() => {
                props.gameover(false);
                props.winSetter(false);
                props.secretSetter();
            }}>RESTART</button>
        </div>
    );
}