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

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-xl font-bold text-red-700 text-center">
        Hello Duniya, welcome to TIC-TAC-TOE
      </p>
      <p className="text-xl font-bold text-red-700 text-center">
        {winner ? `winner is ${winner}` : totalMoves === 9 ? 'Game tied' : ''}
      </p>
      <div className="grid grid-rows-3 grid-cols-3 gap-0 w-36 mx-auto">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <span
              key={`${row}-${col}`}
              className={"border border-black h-12 w-12 rounded-lg mx-auto" + winningCondition.map(pos => {
                if (pos[0] === row && pos[1] === col) {
                  return ' border-red-500 border-4 font-bold '
                }
              })}
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
          className="mx-auto border-2 border-red-700 px-4 py-3 rounded-lg shadow-md"
          onClick={() => {resetGame()}}
        >
          Wanna play again?
        </button>
      }
    </div>
  );
}

export default App;
