import React from "react";
import Box from "./Box";
import { flattenDeep } from "lodash";

export default function GuessArea(props) {
    const newArray = flattenDeep(props.array);
    const guessBoxes = newArray.map((value) => {
        return <Box color={value.color} letter={value.letter}/>
    })
    return (
        <div className="guessarea">
            {guessBoxes}
        </div>
    );
}