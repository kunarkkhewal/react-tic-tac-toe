import { useState } from "react";

type MatrixValues = string[][];

function App() {
  const gameResetLogic = (): string[][] => Array.from({ length: 3 }, () => Array(3).fill(""))
  
  const [isXTurn, setIsXTurn] = useState<boolean>(false);
  const [matrixValues, setMatrixValues] = useState<MatrixValues>(gameResetLogic());
  const [winner, setWinner] = useState<string>('');
  const [winningCondition, setWinningCondition] = useState<number[][]>([]);
  const [totalMoves, setTotalMoves] = useState<number>(0);

  const resetGame = (): void => {
    setMatrixValues(gameResetLogic);
    setWinner('');
    setWinningCondition([]);
    setTotalMoves(0);
  }

  const handleSquareClick = (num1: number, num2: number): void => {
    if (winner || matrixValues[num1][num2]) { 
      return;
    }
    const updatedMatrix: MatrixValues = [...matrixValues];
    updatedMatrix[num1][num2] = isXTurn ? 'X' : 'O';
    setMatrixValues(updatedMatrix);
    setIsXTurn(!isXTurn);
    setTotalMoves(totalMoves + 1);

    const winnerStatus = getWinningStatus();
    if (winnerStatus) {
      setWinner(winnerStatus);
      return;
    }
  };

  const getWinningStatus = () => {
    const conditions = [
      [[0,0], [0,1], [0,2]], 
      [[1,0], [1,1], [1,2]], 
      [[2,0], [2,1], [2,2]], 
      [[0,0], [1,0], [2,0]], 
      [[0,1], [1,1], [2,1]], 
      [[0,2], [1,2], [2,2]], 
      [[0,0], [1,1], [2,2]], 
      [[0,2], [1,1], [2,0]]
    ]
    for(let index = 0; index < conditions.length; index++) {
      const [a, b, c] = conditions[index];
      if (matrixValues[a[0]][a[1]] && matrixValues[a[0]][a[1]] === matrixValues[b[0]][b[1]] && matrixValues[a[0]][a[1]] === matrixValues[c[0]][c[1]]) {
        setWinningCondition(conditions[index]);
        return matrixValues[a[0]][a[1]];
      }
    }
    return null;
  }

  const getWinningClass = (row:  number, col: number): string => {
    for(let index = 0; index < winningCondition.length; index++) {
      if (winningCondition[index][0] === row && winningCondition[index][1] === col) {
        return ' border-yellow-600 border-4 font-bold text-yellow-600 duration-300 scale-125 animate-pulse ';
        break;
      }

    }
    return ''
  }

  return (
    <div className="relative p-4 flex flex-col items-center justify-center bg-blue-950 h-screen w-full">
      <div className="absolute top-5 flex flex-col space-y-5 items-center flex-start">
        <p className="text-xl font-bold text-gray-300 text-center">
          Welcome, to the game of <span>TIC-TAC-TOE</span>
        </p>
        <p className="text-5xl font-bold text-yellow-600 text-center">
          {winner ? `${winner} Wins` : totalMoves === 9 ? 'Game tied' : ''}
        </p>
      </div>
      <div className="grid grid-rows-3 grid-cols-3 gap-5 mx-auto">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <span
              key={`${row}-${col}`}
              className={"border shadow-lg shadow-blue-500/30 h-20 w-20 rounded-lg text-5xl text-center pt-3 text-gray-300 " + getWinningClass(row, col)}
              onClick={() => handleSquareClick(row, col)}
            >
              {matrixValues[row][col]}
            </span>
          ))
        )}
      </div>
      {
        (winner || totalMoves === 9) &&
        <button 
          className="absolute bottom-5 mx-auto text-gray-300 bg-yellow-800 px-4 py-3 border-0 rounded-lg shadow-md"
          onClick={() => {resetGame()}}
        >
          Wanna play again?
        </button>
      }
    </div>
  );
}

export default App;
