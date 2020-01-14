class Game {
  constructor(snake, ghostSnake, food, score, timeLimit) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = score;
    this.timeLimit = timeLimit;
    this.previousFood = {position: [0, 0], foodType: 'normal'};
  }

  hasFoodEaten() {
    const [colId, rowId] = this.food.position;
    const [headX, headY] = this.snake.head;
    return colId == headX && rowId == headY;
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
      this.snake.hadTouchedBody() || this.hadTouchedBoundaries() || isTimeOut()
    );
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

  turn(snakeType, direction) {
    this[snakeType].turn(direction);
  }
}
