const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) => {
  return document.getElementById(getCellId(colId, rowId));
};

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const updateTimeLeft = function(count) {
  const timer = document.getElementsByClassName('timer');
  timer[0].innerText = `Time Left: ${count}s`;
};

const showScore = function(scoreBoard) {
  const scoreBox = document.getElementsByClassName('score');
  scoreBox[0].innerText = `score : ${scoreBoard.score}`;
};

const displayGameOverPanel = function(scoreBoard) {
  const panel = document.getElementsByClassName('gameOver');
  const panelContent = document.getElementsByClassName('status');
  panel[0].style.marginTop = `0vw`;
  panelContent[0].innerText = `GameOver...\nYour score:${scoreBoard.score}`;
};

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const drawFood = function(food) {
  const [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add('food');
};

const removeFood = function(food) {
  const [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.remove('food');
};

const handleKeyPress = snake => {
  const input = event.key;
  switch (input) {
    case 'ArrowLeft':
      snake.turnLeft();
      break;

    case 'ArrowRight':
      snake.turnRight();
      break;

    case 'ArrowUp':
      snake.turnUp();
      break;

    case 'ArrowDown':
      snake.turnDown();
      break;
  }
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

const getRandomFood = function() {
  const foodColNo = Math.round(Math.random() * 60);
  const foodRowNo = Math.round(Math.random() * 100);
  return [foodRowNo, foodColNo];
};

const initFood = function() {
  const foodPosition = getRandomFood();
  const food = new Food(foodPosition);
  return food;
};

const initGhostSnake = function() {
  return new Snake(
    [
      [40, 30],
      [41, 30],
      [42, 30]
    ],
    new Direction(SOUTH),
    'ghost'
  );
};

const initSnake = function() {
  return new Snake(
    [
      [40, 25],
      [41, 25],
      [42, 25]
    ],
    new Direction(EAST),
    'snake'
  );
};

const getTimeLimit = function() {
  return 30;
};

const initializeGame = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = initFood();
  const score = new Score();
  const seconds = getTimeLimit();
  return new Game(snake, ghostSnake, food, score, seconds);
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const updateFoodIfEaten = function(game) {
  if (game.hasFoodEaten()) {
    removeFood(game.food);
    game.updateGame();
    drawFood(game.food);
  }
};

const updateSnakeAndFoodPosition = function(game) {
  moveAndDrawSnake(game.snake);
  moveAndDrawSnake(game.ghostSnake);
  updateFoodIfEaten(game);
  showScore(game.score);
};

const checkStatus = function(game, timeIntervalId, ghostTimeIntervalId) {
  if (game.isOver()) {
    displayGameOverPanel(game.score);
    clearInterval(timeIntervalId);
    clearInterval(ghostTimeIntervalId);
  }
};

const setup = function(game) {
  attachEventListeners(game.snake);
  createGrids();
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
  drawFood(game.food);
  showScore(game.score);
};

const main = function() {
  const game = initializeGame();

  setup(game);
  game.setTimer();
  const timeIntervalId = setInterval(() => {
    checkStatus(game, timeIntervalId, ghostTimeIntervalId);
    updateSnakeAndFoodPosition(game);
  }, 200);

  let ghostSnakeHead = EAST;

  const ghostTimeIntervalId = setInterval(() => {
    switch (ghostSnakeHead) {
      case EAST:
        game.ghostSnake.turnLeft();
        break;

      case WEST:
        game.ghostSnake.turnRight();
        break;

      case NORTH:
        game.ghostSnake.turnUp();
        break;

      case SOUTH:
        game.ghostSnake.turnDown();
        break;
    }
    ghostSnakeHead = (ghostSnakeHead + 1) % 4;
  }, 500);
};
