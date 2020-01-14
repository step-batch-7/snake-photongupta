class Game {
  constructor(snake, ghostSnake, food, score, timer) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = score;
    this.timer = timer;
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
    if (this.hasFoodEaten()) {
      this.snake.increaseLength(this.food.position);
      this.score.increaseScore(this.food.foodType);
      this.previousFood.position = this.food.position;
      this.previousFood.foodType = this.food.foodType;
      this.food.updatePosition();
    }
  }

  moveSnake(snakeType) {
    this[snakeType].move();
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
