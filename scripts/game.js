const getRandomFoodType = function() {
  const types = ['normal', 'special'];
  return types[Math.floor(Math.random() * 2)];
};

const getRandomFoodPosition = function() {
  const foodColNo = Math.floor(Math.random() * NUM_OF_ROWS);
  const foodRowNo = Math.floor(Math.random() * NUM_OF_COLS);
  return [foodRowNo, foodColNo];
};

const initFood = function() {
  const type = getRandomFoodType();
  const foodPosition = getRandomFoodPosition();
  return new Food(foodPosition, type);
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

class Game {
  constructor() {
    this.snake = initSnake();
    this.ghostSnake = initGhostSnake();
    this.food = initFood();
    this.score = new Score(0);
    this.timer = TIME_LIMIT;
    this.previousFood = {position: [0, 0], foodType: 'normal'};
  }

  hasFoodEaten() {
    const [colId, rowId] = this.food.position;
    const [headX, headY] = this.snake.head;
    return colId == headX && rowId == headY;
  }

  hadTouchedBoundaries() {
    const [headX, headY] = this.snake.head;
    const hadTouchedVerticalWalls = headX < 0 || headX == NUM_OF_COLS;
    const hadTouchedHorizontalWalls = headY < 0 || headY == NUM_OF_ROWS;
    return hadTouchedHorizontalWalls || hadTouchedVerticalWalls;
  }

  isOver() {
    return this.snake.hadTouchedBody() || this.hadTouchedBoundaries();
  }

  update() {
    this.moveSnake();
    if (this.hasFoodEaten()) {
      this.snake.increaseLength(this.food.position);
      this.score.updateScore(this.food.point);
      this.previousFood.position = this.food.position;
      this.previousFood.foodType = this.food.foodType;
      this.food = initFood();
    }
  }

  moveSnake() {
    this.snake.move();
    this.ghostSnake.move();
  }

  getStatus() {
    const gameStatus = {
      snake: this.snake.getStatus(),
      ghostSnake: this.ghostSnake.getStatus(),
      food: this.food.getStatus(),
      score: this.score.getStatus(),
      previousFood: {
        position: this.previousFood.position.slice(),
        type: this.previousFood.foodType
      }
    };
    return gameStatus;
  }

  wrap(snakeType) {
    this[snakeType].wrap();
  }

  turn(snakeType, direction) {
    this[snakeType].turn(direction);
  }
}
