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
    this.positions.forEach(([headX, headY], index) => {
      if (headX < 0) headX = 98;
      headX = headX % NUM_OF_COLS;
      if (headY < 0) headY = 58;
      headY = headY % NUM_OF_ROWS;
      this.positions[index] = [headX, headY];
    });
  }

  increaseLength(food) {
    this.positions.unshift(food);
  }

  get head() {
    return this.positions[this.positions.length - 1];
  }

  hadTouchedBody() {
    const body = this.positions.slice(0, -1);
    const [headX, headY] = body.pop();
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
}
