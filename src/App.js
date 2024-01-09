import { useState } from 'react';

function Square({value, onSquareClick})
{
  //
  // In the following line the [value, setValue] pair indicate (by default) a state
  // variable ('value') and a setter ('setValue'). The Click handler uses
  // the setter to set the value of the state variable
  //
  return (<button className="square" onClick = {onSquareClick}>{value}</button>);
}

export default function Board()
{
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i)
  {
    //
    // If square is already filled just return
    //
    if (squares[i])
    {
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

  return (
    <>
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
