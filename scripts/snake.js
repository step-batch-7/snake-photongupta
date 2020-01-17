class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  turn(direction) {
    this.direction[direction]();
  }

  move() {
    const [headX, headY] = this.head;
    this.previousTail = this.positions.shift();
    const [deltaX, deltaY] = this.direction.delta;
    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  wrap() {
    this.positions.forEach(([posX, posY], index) => {
      posX = (posX + NUM_OF_COLS) % NUM_OF_COLS;
      posY = (posY + NUM_OF_ROWS) % NUM_OF_ROWS;
      this.positions[index] = [posX, posY];
    });
  }

  increaseLength() {
    this.positions.unshift(this.previousTail);
  }

  get head() {
    return this.positions[this.positions.length - 1];
  }

  hadTouchedBody() {
    const body = this.positions.slice(0, this.positions.length - 1);
    const [headX, headY] = this.head;
    const hasTouched = body.some(
      ([positionX, positionY]) => positionX == headX && positionY == headY
    );
    return hasTouched;
  }

  getStatus() {
    const snakeStatus = {};
    snakeStatus.positions = this.positions.slice();
    snakeStatus.type = this.type;
    snakeStatus.previousTail = this.previousTail;
    return snakeStatus;
  }

  hasFoodEaten(foodPosition) {
    const [colId, rowId] = foodPosition;
    const [headX, headY] = this.head;
    return colId == headX && rowId == headY;
  }

  isOn(cell) {
    const [x, y] = cell;
    return this.positions.some(([posX, posY]) => posX == x && posY == y);
  }

  hasTouchedGhostSnake(ghostSnakePositions) {
    return ghostSnakePositions.some(position => this.isOn(position));
  }
}
