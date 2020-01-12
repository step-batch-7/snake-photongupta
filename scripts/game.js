class Game {
  constructor(snake, ghostSnake, food, score) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = score;
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

  updateGame() {
    if (this.hasFoodEaten()) {
      this.increaseSnakeLength();
      this.updateFoodPosition();
      this.updateScore();
    }
  }
}
