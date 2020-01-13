class Game {
  constructor(snake, ghostSnake, food, score, timeLimit) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = score;
    this.timeLimit = timeLimit;
    this.previousFood = [0, 0];
  }

  hasFoodEaten() {
    return (
      JSON.stringify(this.snake.head) === JSON.stringify(this.food.position)
    );
  }

  hadTouchedBoundaries() {
    const [headX, headY] = this.snake.head;
    const hadTouchedVerticalWalls = headX < 0 || headX > 99;
    const hadTouchedHorizontalWalls = headY < 0 || headY > 59;
    return hadTouchedHorizontalWalls || hadTouchedVerticalWalls;
  }

  setTimer() {
    setInterval(() => {
      updateTimeLeft(this.timeLimit);
      this.timeLimit--;
    }, 1000);
  }

  isTimeOut() {
    return this.timeLimit == 0;
  }

  isOver() {
    return (
      this.snake.hadTouchedBody() ||
      this.hadTouchedBoundaries() ||
      this.isTimeOut()
    );
  }

  updateGame() {
    if (this.hasFoodEaten()) {
      this.snake.increaseLength(this.food.position);
      this.previousFood = this.food.position;
      this.food.updatePosition();
      this.score.increaseScore();
    }
  }

  getScore() {
    return this.score.score;
  }

  moveSnake(snakeType) {
    this[snakeType].move();
  }

  getStatus() {
    if (this.hasFoodEaten()) {
      this.updateGame();
    }
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
      food: this.food.position.slice(),
      score: this.getScore(),
      previousFood: this.previousFood
    };
  }

  snakeTurnLeft(snakeType) {
    this[snakeType].turnLeft();
  }

  snakeTurnRight(snakeType) {
    this[snakeType].turnRight();
  }

  snakeTurnUp(snakeType) {
    this[snakeType].turnUp();
  }

  snakeTurnDown(snakeType) {
    this[snakeType].turnDown();
  }
}
