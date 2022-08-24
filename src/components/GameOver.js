import React, { Component, useContext } from "react";
import { AppContext } from "../App";
import { boardDefault } from "../Words";
import Board from "../components/Board"
import Keyboard from "../components/Keyboard"
import Cookies from 'js-cookie';

function GameOver() {
  const {
    board,
    setBoard,
    currAttempt,
    counter,
    listOfWords,
    gameOver,
    setGameOver,
    onSelectLetter,
    setDisabledLetters,
    setCorrectWord,
    correctWord,
    onDelete,
    disabledLetters,
    setCurrAttempt,
    setCounter, guessedWord,
  } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </h3>
      
      {gameOver.guessedWord ? 
        <>
        <h1>Correct Word: {correctWord}</h1>
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
        <button onClick={() => {
        console.log("hello", counter)
        document.cookie=`counter=${parseInt(counter) + 1}`
        console.log(Cookies.get('counter'))       
        window.location.reload() 
      
    }}>

    {parseInt(Cookies.get('counter')) !== 9 ? "Next Question" : "Finish"}</button>
        </>

      :

      <button onClick={() => {
        window.location.reload() 
      
    }}>

    Retry</button>
       



      }

    
      
    <br/><br/><br/>
    </div>
  );
}

export default GameOver;
