import { useState } from "react";

type MatrixValues = string[][];

function App() {
  const [isXTurn, setIsXTurn] = useState<boolean>(false);
  const [matrixValues, setMatrixValues] = useState<MatrixValues>(() =>
    Array.from({ length: 3 }, () => Array(3).fill(""))
  );
  const [winner, setWinner] = useState<string>('');

  const handleSquareClick = (num1: number, num2: number): void => {
    if (winner || matrixValues[num1][num2]) { 
      return;
    }
    const updatedMatrix: MatrixValues = [...matrixValues];
    updatedMatrix[num1][num2] = isXTurn ? 'X' : 'O';
    setMatrixValues(updatedMatrix);
    setIsXTurn(!isXTurn);

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
        return matrixValues[a[0]][a[1]];
      }
    }
    return null;
  }

  return (
    <>
      <p className="text-xl font-bold text-red-700 text-center">
        Hello Duniya, welcome to TIC-TAC-TOE
      </p>
      <p className="text-xl font-bold text-red-700 text-center">
        {winner ? `winner is ${winner}` : ''}
      </p>
      <div className="grid grid-rows-3 grid-cols-3 gap-0 w-36 mx-auto">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <span
              key={`${row}-${col}`}
              className="border border-black h-12 w-12 rounded-lg mx-auto"
              onClick={() => handleSquareClick(row, col)}
            >
              {matrixValues[row][col]}
            </span>
          ))
        )}
      </div>
    </>
  );
}

export default App;
