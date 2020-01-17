const arePositionsEqual = function(position1, position2) {
  return position1.every((coordinate, index) => coordinate == position2[index]);
};

class Snake {
  #positions;
  #direction;
  #type;
  #previousTail;
  constructor(positions, direction, type) {
    this.#positions = positions.slice();
    this.#direction = direction;
    this.#type = type;
    this.#previousTail = [0, 0];
  }

  get location() {
    return this.#positions.slice();
  }

  get species() {
    return this.#type;
  }

  get head() {
    return this.#positions[this.#positions.length - 1];
  }

  turn(direction) {
    this.#direction[direction]();
  }

  move() {
    const [headX, headY] = this.head;
    this.#previousTail = this.#positions.shift();
    const [deltaX, deltaY] = this.#direction.delta;
    this.#positions.push([headX + deltaX, headY + deltaY]);
  }

  grow() {
    this.#positions.unshift(this.#previousTail);
  }

  wrap() {
    this.#positions.forEach(([posX, posY], index) => {
      posX = (posX + NUM_OF_COLS) % NUM_OF_COLS;
      posY = (posY + NUM_OF_ROWS) % NUM_OF_ROWS;
      this.#positions[index] = [posX, posY];
    });
  }

  hasTouchedItself() {
    const body = this.#positions.slice(0, this.#positions.length - 1);
    const hasTouched = body.some(position =>
      arePositionsEqual(position, this.head)
    );
    return hasTouched;
  }

  hasFoodEaten(foodPosition) {
    return arePositionsEqual(foodPosition, this.head);
  }

  isOn(cell) {
    return this.#positions.some(position => arePositionsEqual(position, cell));
  }

  hasTouchedGhostSnake(ghostSnakePositions) {
    return ghostSnakePositions.some(position => this.isOn(position));
  }

  getStatus() {
    const snakeStatus = {};
    snakeStatus.positions = this.#positions.slice();
    snakeStatus.type = this.#type;
    snakeStatus.previousTail = this.#previousTail;
    return snakeStatus;
  }
}
