import React, { useState } from "react";
import Cell from "./components/Cell.js"
import "./App.css";

function App() {
  const [cellStates, setCellStates] = useState((() => {
    const arr = [], obj = {};
    arr.length = 1035;
    arr.fill('dead');
    arr.forEach((e, i) => obj[i] = e)
    return obj;
  })());
  const [run, setRun] = useState(false);

  const runSim = () => {
      if (!run) return;
      let nextGen = { ...cellStates };
        Object.keys(cellStates).forEach(i => {
          let liveNeighbours = 0;
          const e = Number(i);
          [1, 45, 44, 46].forEach(p => {
            cellStates[e + p] && cellStates[e + p] === 'alive' && liveNeighbours++;
            cellStates[e - p] && cellStates[e - p] === 'alive' && liveNeighbours++;
          })
          if ((cellStates[e] === 'alive' && liveNeighbours === 2) || liveNeighbours === 3) nextGen[e] = 'alive';
          else if (cellStates[e] === 'alive' && liveNeighbours < 2) nextGen[e] = 'dead';
          else if (cellStates[e] === 'alive' && liveNeighbours > 3) nextGen[e] = 'dead';
          else if (!cellStates[e] === 'alive' && liveNeighbours === 3) nextGen[e] = 'alive';
        })
        setTimeout(() => {
          setCellStates({ ...nextGen });
        }, 100);
    }
    runSim();

  return (
    <>
      <div className='board'>
        {
          Object.keys(cellStates).map((e, i) => <Cell key={i} data={{ cellStates: cellStates, setCellStates: setCellStates, id: i }} />)
        }
      </div>
      <button onClick={() => setRun(prevState => !prevState)}>{run ? 'Stop' : 'Start'}</button>
    </>
  );
}

export default App;
