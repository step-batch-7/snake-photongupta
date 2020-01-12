class Game {
  constructor(snake, ghostSnake, food, score, timeLimit) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = score;
    this.timeLimit = timeLimit;
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

  updateScore() {
    this.score.increaseScore();
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
      this.increaseSnakeLength();
      this.updateFoodPosition();
      this.updateScore();
    }
  }
}
