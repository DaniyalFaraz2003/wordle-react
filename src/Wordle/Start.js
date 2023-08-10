import React from "react";

export default function Start(props) {
    return (
        <div className="startmenu">
            <h1 className="starttitle">HOW TO PLAY</h1>
            <h4 id="one">YOU HAVE <span className="num">6</span> CHANCES TO GUESS A <span className="num">5</span> LETTER WORD</h4>
            <h4 id="one">TRY TO GUESS THE WORD BY ENTERING THE LETTERS FROM THE KEYBOARD GIVEN</h4>
            <h4 id="one">PRESS THE ENTER BUTTON TO SUBMIT THE GUESS</h4>
            <div className="demonstrator">
                <div className="dbox box1"></div>
                <h4 id="one">THIS COLOR BOX SHOWS LETTER IS NOT IN SECRET WORD</h4>
            </div>
            <div className="demonstrator">
                <div className="dbox box2"></div>
                <h4 id="one">THIS COLOR BOX SHOWS LETTER IS IN SECRET WORD BUT IN WRONG POSITION</h4>
            </div>
            <div className="demonstrator">
                <div className="dbox box3"></div>
                <h4 id="one">THIS COLOR BOX SHOWS LETTER IS IN SECRET WORD IN CORRECT POSITION</h4>
            </div>
            <button onClick={props.start} className="start">START</button>
        </div>
    );
}