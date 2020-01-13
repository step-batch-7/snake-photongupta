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

  increaseLength(food) {
    this.positions.unshift(food);
  }

  get head() {
    return this.positions[this.positions.length - 1];
  }

  hadTouchedBody() {
    const body = this.positions.slice(0, -1);
    const head = body.pop();
    const hasTouched = body.some(
      position => JSON.stringify(position) == JSON.stringify(head)
    );
    return hasTouched;
  }
}
