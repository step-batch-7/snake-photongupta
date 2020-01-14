const initFood = function() {
  const foodPosition = getRandomFood();
  return new Food(foodPosition, 'normal');
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
    let points = 1;
    if (this.hasFoodEaten()) {
      this.snake.increaseLength(this.food.position);
      if (this.food.foodType == 'special') {
        points = 5;
      }
      this.score.updateScore(points);
      this.previousFood.position = this.food.position;
      this.previousFood.foodType = this.food.foodType;
      this.food.updatePosition();
    }
  }

  moveSnake() {
    this.snake.move();
    this.ghostSnake.move();
  }

  getStatus() {
    return {
      snake: {
        positions: this.snake.positions.slice(),
        type: this.snake.species,
        previousTail: this.snake.previousTail
      },
      ghostSnake: {
        positions: this.ghostSnake.positions.slice(),
        type: this.ghostSnake.species,
        previousTail: this.ghostSnake.previousTail
      },
      food: {position: this.food.position.slice(), type: this.food.foodType},
      score: this.score.score,
      previousFood: {
        position: this.previousFood.position.slice(),
        type: this.previousFood.foodType
      }
    };
  }

  wrap(snakeType) {
    this[snakeType].wrap();
  }

  turn(snakeType, direction) {
    this[snakeType].turn(direction);
  }
}
