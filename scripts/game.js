const getRandomFoodType = function() {
  const types = ['normal', 'special'];
  return types[Math.floor(Math.random() * 2)];
};

const getRandomFoodPosition = function() {
  const foodColNo = Math.floor(Math.random() * NUM_OF_ROWS);
  const foodRowNo = Math.floor(Math.random() * NUM_OF_COLS);
  return [foodRowNo, foodColNo];
};

const createFood = function() {
  const type = getRandomFoodType();
  const foodPosition = getRandomFoodPosition();
  return new Food(foodPosition, type);
};

class Game {
  #snake;
  #ghostSnake;
  #food;
  #score;
  constructor(snake, ghostSnake, food, score) {
    this.#snake = snake;
    this.#ghostSnake = ghostSnake;
    this.#food = food;
    this.#score = score;
  }

  hasTouchedBoundaries() {
    const [headX, headY] = this.#snake.head;
    const hasTouchedVerticalWalls = headX < 0 || headX == NUM_OF_COLS;
    const hasTouchedHorizontalWalls = headY < 0 || headY == NUM_OF_ROWS;
    return hasTouchedHorizontalWalls || hasTouchedVerticalWalls;
  }

  isOver() {
    const ghostSnakeStatus = this.#ghostSnake.getStatus();
    return (
      this.#snake.hasTouchedItself() ||
      this.hasTouchedBoundaries() ||
      this.#snake.hasTouchedGhostSnake(ghostSnakeStatus.positions)
    );
  }

  getFoodDirection(foodStatus) {
    const [foodX, foodY] = foodStatus.position;
    const [headX, headY] = this.#ghostSnake.head;
    let direction = 'Down';
    if (foodX < headX && foodY == headY) {
      direction = 'Left';
    }
    if (foodX > headX && foodY == headY) {
      direction = 'Right';
    }
    if (foodX == headX && foodY < headY) {
      direction = 'Up';
    }
    return direction;
  }

  update() {
    const foodStatus = this.#food.getStatus();
    const direction = this.getFoodDirection(foodStatus);
    this.turn('ghostSnake', direction);
    this.moveSnakes();
    this.#ghostSnake.wrap();
    if (this.#snake.hasFoodEaten(foodStatus.position)) {
      this.#snake.grow();
      this.#score.updateScore(foodStatus.point);
      this.#food = createFood();
    }
    if (this.#ghostSnake.hasFoodEaten(foodStatus.position)) {
      this.#ghostSnake.grow();
      this.#food = createFood();
    }
  }

  getStatus() {
    return {
      snake: this.#snake.getStatus(),
      ghostSnake: this.#ghostSnake.getStatus(),
      food: this.#food.getStatus(),
      score: this.#score.getStatus()
    };
  }

  moveSnakes() {
    this.#snake.move();
    this.#ghostSnake.move();
  }

  turn(snakeType, direction) {
    if (snakeType == 'snake') this.#snake.turn(direction);
    if (snakeType == 'ghostSnake') this.#ghostSnake.turn(direction);
  }
}
