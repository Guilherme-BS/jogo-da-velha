import React, { Component, useEffect, useState } from "react";
import "./App.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const winner = calculateWinner(board);
  const isGameOver = winner != null || board.every((value) => value != null);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isGameOver) {
    status = "Velha";
  } else {
    status = "Next player: " + (isXTurn ? "X" : "O");
  }

  const handleClick = (i) => {
    if (isGameOver) return;
    if (board[i] != null) return;
    const newBoard = [...board];
    newBoard[i] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setBoard(newBoard);
  };

  const renderSquare = (i) => {
    return <Square value={board[i]} onClick={() => handleClick(i)} />;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="container">
      <h1>Jogo da Velha</h1>
      <div className="status"><h2>{status}</h2></div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="reset" onClick={() => handleReset()}>Reset</button>
    </div>
  );
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
