import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.webp";

const TicTacToe = () => {
  const [gameData, setGameData] = useState(Array(9).fill(null)); // Initialize empty board
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null); // Track the winner

  const winningCombinations = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
  ];

  const toggle = (index) => {
    if (lock || gameData[index]) return; // Prevent moves if locked or cell already filled

    const newGameData = [...gameData];
    newGameData[index] = count % 2 === 0 ? cross_icon : circle_icon; // Alternate turns
    setGameData(newGameData);
    setCount(count + 1);

    checkWin(newGameData);
  };

  const checkWin = (data) => {
    for (const [a, b, c] of winningCombinations) {
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        setWinner(data[a]); // Set the winner (X or O)
        setLock(true); // Lock the board to prevent further moves
        return;
      }
    }

    // Check for a draw
    if (data.every((cell) => cell !== null) && !winner) {
      setWinner("draw");
      setLock(true);
    }
  };

  const resetGame = () => {
    setGameData(Array(9).fill(null)); // Clear the board
    setCount(0); // Reset turn counter
    setLock(false); // Unlock the board
    setWinner(null); // Reset winner
  };

  const getTitle = () => {
    if (winner === cross_icon) {
      return "Player X wins!";
    } else if (winner === circle_icon) {
      return "Player O wins!";
    } else if (winner === "draw") {
      return "It's a draw!";
    } else {
      return (
        <>
          Tic Tac Toe<br /> Game <span>In React</span>
        </>
      );
    }
  };

  return (
    
    <div className="container">

<h1 className="title">{getTitle()}</h1>
      <div className="board">
        {gameData.map((image, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => toggle(index)} // Handle cell click
          >
            {image && (
              <img
                src={image}
                alt={image === cross_icon ? "Cross" : "Circle"}
              />
            )}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
