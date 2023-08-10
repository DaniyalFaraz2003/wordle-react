import React from "react";

export default function Box(props) {
    const classname = `box ${props.color}`;
    return (
        <div className={classname}>
            <p>{props.letter.toUpperCase()}</p>
        </div>
    );
}
