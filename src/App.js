import { useState } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {

  const [history, setHistory] = useState([{squares:Array(9).fill(null)}]);
  const [xIsNext,setXIsNext] = useState(true);

  const calculateWinner =(squares)=>{
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let index=0; index<lines.length; index++){
      const [a,b,c] = lines[index];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;

  }

  const [stepNumber,setStepNumber]=useState(0);//돌아가고자하는 step을 기억하기 위함
  const current=history[stepNumber];//history의 가장 최근의 배열을 나타낸다.
  const winner = calculateWinner(current.squares);
  //()안은 현재 눌러진 진행된 상태를 나타낸다.
  //.squares는 가장 최근의 배열중 squres의 배열을 가지고온다는 뜻~
  let status;
  if (winner){
    status ='Winner: '+winner;
  }else{
    status= `Next player: ${xIsNext ? 'X':'O'}`;
  }

  const handleClick=(i)=>{
    const newHistory = history.slice(0,stepNumber+1);
    const newCurrent = newHistory[newHistory.length-1];
    const newSquares = newCurrent.squares.slice();//배열 복사
    if(calculateWinner(newSquares)||newSquares[i]){
      return;
  }
  newSquares[i]=xIsNext? 'x': 'o';
  setHistory([...newHistory, {squares:newSquares}]);
  setXIsNext(prev=>!prev);
        setStepNumber(newHistory.length);//
  }
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }
  const moves = history.map((step,move)=>{
    const desc = move? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button className="move-button" onClick={()=>jumpTo(move)}>{desc}</button>
      </li>);
  });

  return (
    <div className='game'>
      <div className='game-board'>
      <Board squares={current.squares} onClick={(i)=>handleClick(i)}/>
      </div>
      <div className='game-info'>
         <div className='status'>{status}</div>
         <ol style={{listStyle:'none'}}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
