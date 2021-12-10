import { motion } from "framer-motion";
import { useReducer, useState } from "react";
import { checkForWin, deepClonedBoard } from "../lib/utils";
import { initialGameState, gameReducer } from "../state/reducer";
import Row from "./Row";

export default function Connect4() {
  const name = ["C", "o", "n", "n", "e", "c", "t", "4"];
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  );
  const [startingPlayer, setStartingPlayer] = useState(1);

  const switchPlayer = () => {
    if (startingPlayer === 1) {
      setStartingPlayer(2);
    } else {
      setStartingPlayer(1);
    }
  };

  const playLogic = (col: number) => {
    let board = deepClonedBoard(gameState.board);
    const boardLen = board.length - 1;
    for (let row = boardLen; row >= 0; row--) {
      if (!board[row][col]) {
        board[row][col] = gameState.currentPlayer;
        break;
      }
    }
    let result = checkForWin(board);
    if (result === gameState.player1) {
      switchPlayer();
      dispatchGameState({
        type: "endGame",
        message: "Player 1 Wins!",
        board,
      });
    } else if (result === gameState.player2) {
      switchPlayer();
      dispatchGameState({
        type: "endGame",
        message: "Player 2 Wins!",
        board,
      });
    } else if (result === "draw") {
      switchPlayer();
      dispatchGameState({
        type: "endGame",
        message: "Draw Game!",
        board,
      });
    } else {
      const nextPlayer =
        gameState.currentPlayer === gameState.player1
          ? gameState.player2
          : gameState.player1;

      dispatchGameState({ type: "togglePlayer", nextPlayer, board });
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.2 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="flex flex-col col-span-2 m-8">
          <div className="flex flex-col fixed">
            {name.map((letter: string) => {
              return (
                <div className="text-3xl font-bold text-indigo-400 py-8">
                  {letter}
                </div>
              );
            })}
          </div>
          <div className="flex flex-row pb-10 pl-32">
            <button
              className="px-8 py-2 bg-green-600 text-white font-bold shadow rounded"
              onClick={() => {
                dispatchGameState({
                  type: "newGame",
                  board: initialGameState.board,
                  currentPlayer: startingPlayer,
                });
              }}
            >
              New Game
            </button>
            <div className="px-8 font-semibold italic text-lg">
              Player {gameState.currentPlayer}'s turn
            </div>
          </div>
          {gameState.message ? (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatDelay: 1.5 }}
              className="px-24 py-4 bg-indigo-500 text-white rounded-lg shadow-lg font-bold text-2xl items-center m-8"
            >
              {gameState.message}
            </motion.div>
          ) : (
            <div className="self-center">
              <table>
                <tbody>
                  {gameState.board.map((row: any, index: number) => {
                    return (
                      <div className="flex flex-row" key={index}>
                        <Row key={index} row={row} play={playLogic} />
                      </div>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
