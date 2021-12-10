export const initialGameState = {
    player1: 1,
    player2: 2,
    currentPlayer: 1,
    board: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ],
    gameOver: false,
    message: null,
  };

export const gameReducer = (state: any, action: any) => {
      switch (action.type) {
        case 'newGame':
          return {
            ...initialGameState,
            currentPlayer: action.currentPlayer,
            board: action.board,
          }
        case 'togglePlayer':
          return {
            ...state,
            currentPlayer: action.nextPlayer,
            board: action.board,
          }
        case 'endGame':
          return {
            ...state,
            gameOver: true,
            message: action.message,
            board: action.board,
          }
        case 'updateMessage':
          return {
            ...state,
            message: action.message,
          }
        default:
          throw Error(`Action "${action.type}" is not a valid action.`)
      }
    }
    