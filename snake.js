const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnRight() {
    if (this.heading == NORTH || this.heading == SOUTH) {
      this.heading = EAST;
    }
  }

  turnLeft() {
    if (this.heading == NORTH || this.heading == SOUTH) {
      this.heading = WEST;
    }
  }

  turnUp() {
    if (this.heading == EAST || this.heading == WEST) {
      this.heading = NORTH;
    }
  }

  turnDown() {
    if (this.heading == WEST || this.heading == EAST) {
      this.heading = SOUTH;
    }
  }
}

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  turnRight() {
    this.direction.turnRight();
  }

  turnUp() {
    this.direction.turnUp();
  }

  turnDown() {
    this.direction.turnDown();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  increaseLength(food) {
    this.positions.push(food);
  }

  get head() {
    return this.positions[this.positions.length - 1];
  }
}

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

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

class Food {
  constructor(position) {
    this.position = position.slice();
  }

  updatePosition() {
    this.position = getRandomFood();
  }
}

const getRandomFood = function() {
  const foodColNo = Math.round(Math.random() * 60);
  const foodRowNo = Math.round(Math.random() * 100);
  return [foodRowNo, foodColNo];
};

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }

  hasFoodEaten() {
    return (
      JSON.stringify(this.snake.head) === JSON.stringify(this.food.position)
    );
  }

  increaseSnakeLength() {
    this.snake.increaseLength(this.food.position);
  }

  updateFoodPosition() {
    this.food.updatePosition();
  }
}

const initializeGame = function() {
  const snake = new Snake(
    [
      [40, 25],
      [41, 25],
      [42, 25]
    ],
    new Direction(EAST),
    'snake'
  );

  const ghostSnake = new Snake(
    [
      [40, 30],
      [41, 30],
      [42, 30]
    ],
    new Direction(SOUTH),
    'ghost'
  );

  const foodPosition = getRandomFood();
  const food = new Food(foodPosition);

  return new Game(snake, ghostSnake, food);
};

const updateFood = function(game) {
  removeFood(game.food);
  game.updateFoodPosition();
  drawFood(game.food);
};

const updateSnakeAndFoodPosition = function(game) {
  moveAndDrawSnake(game.snake);
  moveAndDrawSnake(game.ghostSnake);
  if (game.hasFoodEaten()) {
    updateFood(game);
  }
};

const main = function() {
  const game = initializeGame();

  attachEventListeners(game.snake);
  createGrids();
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
  drawFood(game.food);

  setInterval(() => {
    updateSnakeAndFoodPosition(game);
  }, 200);

  let ghostSnakeHead = EAST;

  setInterval(() => {
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
