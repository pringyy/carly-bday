import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";
import Cookies from 'js-cookie';
import FinalAnswer from './components/FinalAnswer'

export const AppContext = createContext();

function App() {
  const [counter, setCounter] = useState(0)
  const listOfWords = ["cabin", "ocean", "plane", "enter", "night", "habit", "above", "games", "exist", "nacho"]
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {

    console.log(Cookies.get('counter'))  
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      if (Cookies.get('counter')){
        setCounter(parseInt(Cookies.get('counter')))

        console.log(listOfWords[parseInt(Cookies.get('counter'))])
        setCorrectWord(listOfWords[parseInt(Cookies.get('counter'))]);
      } else {
        document.cookie=`counter=${0}`
        console.log("test", Cookies.get('counter'))
        console.log(listOfWords[parseInt(Cookies.get('counter'))])
        setCorrectWord(listOfWords[parseInt(Cookies.get('counter'))]);
      }
  
    });
  }, []);

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    console.log(currAttempt);
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    var newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Carls Birthday Wordle</h1>
      </nav>
      
      <AppContext.Provider
        value={{
          board,
          listOfWords,
          counter,
          setBoard,
          currAttempt,
          setCurrAttempt,
          setCorrectWord,
          setGameOver,
          correctWord,
          onSelectLetter,
          setCounter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      > 
         {parseInt(Cookies.get('counter')) !== 10 ?
         <>
            <h2>Question {parseInt(Cookies.get('counter')) + 1}/10</h2>
        <div className="game">
    
       
        <Board />
          {gameOver.gameOver ? <GameOver /> :  <Keyboard />}
        </div>
        </>
        :
        <>
        <FinalAnswer/>
        <br/>
        <p>Get ready because for your 23rd birthday I am taking you for a all expenses paid weekend away to Copenhagen!</p>
        <p>We are going on Friday the 16th (at 19:10) until Monday the 19th of December (arrive back at 23:30)!</p>
        <p>You only need to take Monday off for the holiday hence why we leave late on the Friday :D</p>
        <p>Happy Bday Carl, love you lots and hope you like your gift xxxx</p>
        </>
      }
      </AppContext.Provider>
        
    </div>
  );
}

export default App;
