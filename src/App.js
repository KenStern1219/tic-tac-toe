import { useState } from 'react';

//
// The Square component encapsulates the button
//
function Square({value, onSquareClick})
{
  return (<button className="square" onClick = {onSquareClick}>{value}</button>);
}

//
// The Board component deals with the collection of Squares
//
function Board({ xIsNext, squares, onPlay })
{
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

    //
    // onPlay is an alias for handlePlay which
    // updates the history ahd toggles the next
    // player
    //
    onPlay(nextSquares);
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

export default function Game()
{
  //
  // In the following lines the [value, setValue] pair indicate (by default) a state
  // variable ('value') and a setter ('setValue'). useState sets the initial value
  // of the state
  //
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const currentSquares = history[history.length - 1];

  function jumpTo(nextMove)
  {
    // To Do
  }

  /*
    As we iterate through history array inside the function you passed to map, the squares 
    argument goes through each element of history, and the move argument goes through each 
    array index: 0, 1, 2, …. (In most cases, you’d need the actual array elements, but to 
    render a list of moves we will only need indexes.)

    For each move in the tic-tac-toe game’s history, we create a list item <li> which contains 
    a button <button>. The button has an onClick handler which calls a function called 
    jumpTo
  */

  const moves = history.map((squares, move) => 
  {
    let description;
    if (move > 0) 
    {
      description = 'Go to move #' + move;
    } else 
    {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function handlePlay(nextSquares)
  {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className = "game">
      <div className = "game-board">
        <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay} />
      </div>
      <div className = "game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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
