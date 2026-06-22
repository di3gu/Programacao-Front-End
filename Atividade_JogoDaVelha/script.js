const { useState } = React;

function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function Square({ value, onSquareClick, highlight }) {
  return (
    <button
      className={highlight ? "square winner" : "square"}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  const result = calculateWinner(squares);
  const winnerLine = result ? result.line : [];
  const isDraw = !result && squares.every(Boolean);

  let status;
  if (result) status = "🏆 Vencedor: " + result.winner;
  else if (isDraw) status = "🤝 Empate!";
  else status = "Próximo jogador: " + (xIsNext ? "X" : "O");

  return (
    <div>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} highlight={winnerLine.includes(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} highlight={winnerLine.includes(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} highlight={winnerLine.includes(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} highlight={winnerLine.includes(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} highlight={winnerLine.includes(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} highlight={winnerLine.includes(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} highlight={winnerLine.includes(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} highlight={winnerLine.includes(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} highlight={winnerLine.includes(8)} />
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((_, move) => {
    const desc = move === 0 ? "Início do jogo" : "Jogada #" + move;

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {move === currentMove ? <strong>{desc}</strong> : desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <h3>Histórico de jogadas</h3>
        <ol>{moves}</ol>

        <button className="reset-btn" onClick={resetGame}>
          🔄 Novo jogo
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);