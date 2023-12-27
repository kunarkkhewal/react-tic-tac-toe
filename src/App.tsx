import { useState } from "react";

type MatrixValues = string[][];

function App() {
  const [isXTurn, setIsXTurn] = useState<boolean>(false);
  const [matrixValues, setMatrixValues] = useState<MatrixValues>(() =>
    Array.from({ length: 3 }, () => Array(3).fill(""))
  );

  const handleSquareClick = (num1: number, num2: number): void => {
    const updatedMatrix: MatrixValues = [...matrixValues];
    updatedMatrix[num1][num2] = isXTurn ? 'X' : 'O';
    setMatrixValues(updatedMatrix);
    setIsXTurn(!isXTurn);
  };

  return (
    <>
      <p className="text-xl font-bold text-red-700 text-center">
        Hello Duniya, welcome to TIC-TAC-TOE
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
