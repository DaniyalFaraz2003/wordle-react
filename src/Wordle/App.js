import React, { useState } from "react";
import Game from "./Game";
import Start from "./Start";
import GameOver from "./GameOver";

async function getRandomWord() {
    const response = await fetch('https://api.datamuse.com/words?sp=?????');
    const words = await response.json();

    if (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex].word;
    } else {
        return null;
    }
}


export default function App() {
    const [secret, setSecret] = useState("hello");
    const [start, setStart] = useState(false);
    const [gameover, setGameover] = useState(false);
    const [win, setWin] = useState(false);
    const flipGameover = (value) => {
        setGameover(value);
    }
    const setRandomSecret = () => {
        getRandomWord()
            .then(word => {
                if (word) {
                    setSecret(word);
                } else {
                    console.log('No words found.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    const winTrue = (value) => {
        setWin(value);
    }
    const flipStart = () => {
        setStart(prev => !prev);
    }
    return (
        <div>
            {start ? 
            gameover ? 
            <GameOver secretSetter={setRandomSecret} word={secret} win={win} gameover={flipGameover} winSetter={winTrue} /> : 
            <Game secret={secret} win={winTrue} gameover={flipGameover} /> : 
            <Start start={flipStart} />}
        </div>
    );
}