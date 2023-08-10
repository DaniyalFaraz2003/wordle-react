import React, { useState } from "react";
import Head from "./Header";
import GuessArea from "./GuessArea";
import Keyboard from "./Keyboard";
import { cloneDeep } from "lodash";

const guessArea = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
]


const keyboardKeys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "back"]
]

function initGuessArea() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            guessArea[i][j] = {
                letter: guessArea[i][j],
                color: "transparent"
            }
        }
    }
}

function initKeyboardKeys() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < keyboardKeys[i].length; j++) {
            keyboardKeys[i][j] = {
                label: keyboardKeys[i][j],
                color: "lightgrey"
            }
        }
    }
}

const findInKeyboard = (key) => {
    for (let i = 0; i < keyboardKeys.length; i++) {
        for (let j = 0; j < keyboardKeys[i].length; j++) {
            if (keyboardKeys[i][j].label === key) {
                return [i, j];
            }
        }
    }
}

async function isValidWord(word) {
    const response = await fetch(`https://api.datamuse.com/words?sp=${word}&max=1`);
    const words = await response.json();

    if (words.length > 0) {
        return words[0].word === word;
    } else {
        return false;
    }
}


initGuessArea();
initKeyboardKeys();


export default function Game(props) {
    const [guessarea, setGuessarea] = useState(guessArea)
    const [keyboard, setKeyboard] = useState(keyboardKeys);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentRowIndex, setCurrentRowIndex] = useState(0);
    const [incorrect, setIncorrect] = useState(false);


    const restart = () => {
        setKeyboard(keyboardKeys);
        setGuessarea(guessArea);
        setCurrentRow(0);
        setCurrentRowIndex(0);
    }

    const updateColors = (guess_area, current_row) => {
        setKeyboard((prev) => {
            const copy = cloneDeep(prev);
            for (let i = 0; i < guess_area[currentRow].length; i++) {
                if (guess_area[current_row][i].letter === "") continue;
                if (!props.secret.includes(guess_area[current_row][i].letter)) {
                    guess_area[current_row][i].color = "darkgrey";
                    const [row, j] = findInKeyboard(guess_area[current_row][i].letter);
                    copy[row][j].color = "darkgrey";
                }
                else {
                    guess_area[current_row][i].color = "yellow";
                    const [row, j] = findInKeyboard(guess_area[current_row][i].letter);
                    copy[row][j].color = "yellow";
                }
            }
            for (let i = 0; i < guess_area[currentRow].length; i++) {
                if (guess_area[current_row][i].letter === "") continue;
                if (guess_area[current_row][i].letter === props.secret[i]) {
                    guess_area[current_row][i].color = "green";
                    const [row, j] = findInKeyboard(guess_area[current_row][i].letter);
                    copy[row][j].color = "green";
                }
            }
            return copy;
        })
    }

    const handleGameover = (gameState) => {
        setTimeout(() => {
            let str = "";
            for (let obj of gameState[currentRow]) {
                str += obj.letter;
            }
            if (str === props.secret) {
                props.win(true);
                props.gameover(true);
                restart();
            }
        }, 500);
    }

    const updateOnKeyPress = (keyLabel) => {
        setGuessarea(prev => {
            const copy = cloneDeep(prev);
            if (keyLabel === "enter") {
                if (currentRow !== 6) {
                    if (currentRowIndex === 5) {
                        let str = "";
                        for (let obj of copy[currentRow]) {
                            str += obj.letter;
                        }
                        isValidWord(str)
                            .then(isValid => {
                                if (isValid) {
                                    updateColors(copy, currentRow);
                                    setCurrentRow(prev => prev + 1);
                                    setCurrentRowIndex(0);
                                    handleGameover(copy);
                                    setIncorrect(false);
                                } else {
                                    setIncorrect(true);
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching data:', error);
                            });
                    }
                }

            }
            else if (keyLabel === "back") {
                if (currentRowIndex > 0) {
                    copy[currentRow][currentRowIndex - 1].letter = "";
                    setCurrentRowIndex(prev => prev - 1);
                    setIncorrect(false);
                }
            }
            else {
                if (currentRowIndex < 5) {
                    copy[currentRow][currentRowIndex].letter = keyLabel;
                    setCurrentRowIndex(prev => prev + 1);
                    setIncorrect(false);
                }
            }
            return copy;
        })
    }
    if (currentRow === 6) {
        setTimeout(() => {
            props.gameover(true);
            let str = "";
            for (let obj of guessarea[5]) {
                str += obj.letter;
            }
            if (str === props.secret) {
                props.win(true);
            }
            else {
                props.win(false);
            }
            restart();
        }, 500);
    }
    return (
        <div className="main">
            <Head />
            <p className="teller">{incorrect ? "THE WORD MUST BE VALID" : ""}</p>
            <GuessArea array={guessarea} />
            <Keyboard array={keyboard} update={updateOnKeyPress} />
        </div>
    );
}