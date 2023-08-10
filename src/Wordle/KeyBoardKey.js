import React from "react";

export default function KeyBoardKey(props) {
    const classname = `keyboardkey ${props.label} ${props.color}`;
    return (
        <div>
            <button className={classname} onClick={() => props.update(props.label)}>
                {props.label.toUpperCase()}
            </button>
        </div>
    );
}