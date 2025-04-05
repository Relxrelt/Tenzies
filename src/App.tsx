import Die from "./components/Die"
import { useState } from "react";
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
    const [diceArray, setDiceArray] = useState(() => generateAllNewDice());
    let gameWon = (diceArray.every(die => die.isHeld) && 
    diceArray.every(die => die.value == diceArray[0].value))
    
    function generateAllNewDice() {
        let diceArray = [];
        for (let i = 0; i < 10; i++) {
            diceArray.push(getRandomIntInclusive(1,6));
        }
        return diceArray.map((number) => ({value: number, isHeld: false, id: nanoid()}));
    }
    
    function getRandomIntInclusive(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    }
    
    const dieElements = diceArray.map((die) => <Die key={die.id} value={die.value} isHeld={die.isHeld} hold={hold} id={die.id}/>)

    function hold(id: string) {
        setDiceArray(prev => prev.map(die => 
           die.id == id ? {...die, isHeld: !die.isHeld} : die
        ))
    }

    function rollDice() {
        setDiceArray(prev => prev.map(die =>
            die.isHeld ? die : {...die, value: getRandomIntInclusive(1,6)}
        ))
    }

    function newGame() {
        setDiceArray(generateAllNewDice())
    }

    return <main id="game-container">
        {gameWon && <Confetti/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div id="die-container">
            {dieElements}
        </div>
        <button onClick={() => gameWon ? newGame() : rollDice() } className="roll-button">{gameWon ? "New Game" : "Roll"}</button>
    </main>
}