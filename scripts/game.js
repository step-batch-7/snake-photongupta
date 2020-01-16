class Game {
  constructor(snake, ghostSnake, food, score) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = score;
  }

  hasFoodEaten() {
    const [colId, rowId] = this.food.position;
    const [headX, headY] = this.snake.head;
    return colId == headX && rowId == headY;
  }

  hadTouchedBoundaries() {
    const [headX, headY] = this.snake.head;
    const hadTouchedVerticalWalls = headX == 0 || headX == 99;
    const hadTouchedHorizontalWalls = headY == 0 || headY == 59;
    return hadTouchedHorizontalWalls || hadTouchedVerticalWalls;
  }

  isOver() {
    return this.snake.hadTouchedBody() || this.hadTouchedBoundaries();
  }

  update() {
    const direction = getRandomDirection();
    this.turn('ghostSnake', direction);
    this.snake.move();
    this.ghostSnake.move();
    this.ghostSnake.wrap();
    if (this.hasFoodEaten()) {
      const foodStatus = this.food.getStatus();
      this.snake.increaseLength(foodStatus.position);
      this.score.updateScore(foodStatus.point);
      this.food = initFood();
    }
  }

  getStatus() {
    return {
      snake: this.snake.getStatus(),
      ghostSnake: this.ghostSnake.getStatus(),
      food: this.food.getStatus(),
      score: this.score.getStatus()
    };
  }

  turn(snakeType, direction) {
    this[snakeType].turn(direction);
  }
}
