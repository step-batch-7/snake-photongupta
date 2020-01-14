class Snake {
  constructor(positions, direction, type, speedFactor) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
    this.speedFactor = 0.2;
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

  comeFromOppositeSide() {
    this.positions.forEach(([headX, headY], index) => {
      if (headX > 99) headX = 0;
      headX = headX % 99;
      if (headY < 0) headY = 59;
      headY = headY % 59;
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
    const head = body.pop();
    const hasTouched = body.some(
      position => JSON.stringify(position) == JSON.stringify(head)
    );
    return hasTouched;
  }
}
