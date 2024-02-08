import { useState } from 'react';

//
// The Square component encapsulates the button
//
function Square({value, onSquareClick})
{
  //
  // In the following line the [value, setValue] pair indicate (by default) a state
  // variable ('value') and a setter ('setValue'). The Click handler uses
  // the setter to set the value of the state variable
  //
  return (<button className="square" onClick = {onSquareClick}>{value}</button>);
}

//
// The Board component deals with the collection of
// Squares and runs the game
//
export default function Board()
{
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  function handleClick(i)
  {
    //
    // Check for a winner
    //
    if (squares[i] || calculateWinner(squares))
    {
      //
      // Return if square is occupied or if there is a winner
      // Here, an empty square
      // has a value of null == false and a filled square is non-null == true
      //
      return;
    }

    //
    // Make a copoy of the squares array so that we don't modify
    // the original. This can be important later on if we want to
    // examine the original state
    //
    const nextSquares = squares.slice();

    //
    // Alternate between Xs and Os
    //
    if (xIsNext)
    {
      nextSquares[i] = "X";
    }
    else
    {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  } 

  //
  // Update winner status
  //
  const winner = calculateWinner(squares);
  let status;
  if (winner)
  {
    status = "Winner: " + winner;
  }
  else
  {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className = "status">{status}</div>
      <div className = "board-row">
        <Square value = {squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value = {squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value = {squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className = "board-row">
        <Square value = {squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value = {squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value = {squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className = "board-row">
        <Square value = {squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value = {squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value = {squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) 
{
  const lines = 
  [
    //
    // These are the 8 possible winning combination of squares
    //
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) 
  {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) 
    {
      return squares[a];
    }
  }
  return null;
}
