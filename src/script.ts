const body = document.body;

//Game State
const players: string[] = ['O', 'X'];
const gameBoard: string[] = ['', '', '', '', '', '', '', '', ''];
let currentPlayer: string;
let gameBoardEl: any;

const createTitle = (title: string): void => {
  const titleEl = document.createElement('h1');

  titleEl.textContent = title;

  body.appendChild(titleEl);
};

const makeGameBoardEl = () => {
  const gameBoardEl = document.createElement('div');

  gameBoardEl.classList.add('game-board', 'center');

  return gameBoardEl;
};

const makeSquareEl = (squareNumber: number) => {
  const squareEl = document.createElement('div');

  squareEl.classList.add('game-square');

  squareEl.addEventListener(
    'click',
    (event) => {
      const { target } = event;
      target.textContent = currentPlayer;
      gameBoard[squareNumber] = currentPlayer;

      checkBoard();
      switchPlayer();
    },
    { once: true }
  );

  return squareEl;
};

const switchPlayer = (): void => {
  if (currentPlayer === players[0]) {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
};

const checkBoard = () => {
  //game board
  //['0', '1', '2']
  //['3', '4', '5']
  //['6', '7', '8']

  const winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let winState of winningStates) {
    const [position1, position2, position3] = winState;

    if (
      gameBoard[position1] !== '' &&
      gameBoard[position1] === gameBoard[position2] &&
      gameBoard[position1] === gameBoard[position3]
    ) {
      completeGame(`${gameBoard[position1]}'s wins!`);
      return;
    }
  }

  const allSquaresUsed = gameBoard.every((square) => square !== '');

  if (allSquaresUsed) {
    completeGame(`it's a draw!`);
  }
};

const completeGame = (message: string): void => {
  const overlayEl = document.createElement('div');
  overlayEl.style.position = 'fixed';
  overlayEl.style.top = '0';
  overlayEl.style.left = '0';
  overlayEl.style.right = '0';
  overlayEl.style.bottom = '0';
  overlayEl.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlayEl.style.display = 'flex';
  overlayEl.style.flexDirection = 'column';
  overlayEl.style.justifyContent = 'center';
  overlayEl.style.alignItems = 'center';
  overlayEl.style.textAlign = 'center';

  const messageEl = document.createElement('h2');
  messageEl.textContent = message;
  messageEl.style.color = 'white';
  messageEl.style.fontSize = '100px';

  overlayEl.appendChild(messageEl);
  body.appendChild(overlayEl);

  const restartButtonEl = document.createElement('button');
  restartButtonEl.textContent = 'Restart';
  restartButtonEl.style.backgroundColor = 'transparent';
  restartButtonEl.style.color = 'white';
  restartButtonEl.style.border = '1px solid rgba(0, 196, 3)';
  restartButtonEl.style.borderRadius = '5%';
  restartButtonEl.style.padding = '10px 30px';
  restartButtonEl.style.fontSize = '30px';
  restartButtonEl.style.cursor = 'pointer';

  overlayEl.appendChild(restartButtonEl);

  //button mouse hover
  restartButtonEl.addEventListener('mouseover', (event) => {
    restartButtonEl.style.backgroundColor = 'rgba(2, 161, 4)';
  });

  //button mouse out
  restartButtonEl.addEventListener('mouseout', (event) => {
    restartButtonEl.style.backgroundColor = 'transparent';
  });

  //overlay
  restartButtonEl.addEventListener('click', () => {
    resetGame();
    body.removeChild(overlayEl);
  });
};

const resetGame = () => {
  if (gameBoardEl) {
    body.removeChild(gameBoardEl);
  }
  gameBoardEl = makeGameBoardEl();

  for (let square = 0; square < 9; square++) {
    gameBoardEl.appendChild(makeSquareEl(square));
  }

  currentPlayer = players[0];
  gameBoard.fill('');

  body.appendChild(gameBoardEl);
};

const bodyText = (words: string): string => {
  const h3 = document.createElement('h3');

  h3.textContent = words;
  h3.style.marginTop = '0%';
  h3.style.marginBottom = '5%';
  h3.style.fontSize = '17px';

  body.appendChild(h3);

  return words;
};

createTitle('Tic-Tac-Toe');
bodyText('Created with ❤️ using Typescript only by Kasey Bourdier');
resetGame();
