import React from "react";
import KeyBoardKey from "./KeyBoardKey";

export default function Keyboard(props) {
    const row1 = props.array[0].map((value) => {
        return <KeyBoardKey 
        color={value.color} 
        label={value.label} 
        update={props.update}
        key={value.label}/>
    })
    const row2 = props.array[1].map((value) => {
        return <KeyBoardKey 
        color={value.color} 
        label={value.label}
        update={props.update}
        key={value.label}/>
    })
    const row3 = props.array[2].map((value) => {
        return <KeyBoardKey 
        color={value.color} 
        label={value.label}
        update={props.update}
        key={value.label}/>
    })
    return (
        <div className="keyboard">
            <div className="keyboardrow">{row1}</div>
            <div className="keyboardrow">{row2}</div>
            <div className="keyboardrow">{row3}</div>
        </div>
    );
}