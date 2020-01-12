class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnRight() {
    if (this.heading == NORTH || this.heading == SOUTH) {
      this.heading = EAST;
    }
  }

  turnLeft() {
    if (this.heading == NORTH || this.heading == SOUTH) {
      this.heading = WEST;
    }
  }

  turnUp() {
    if (this.heading == EAST || this.heading == WEST) {
      this.heading = NORTH;
    }
  }

  turnDown() {
    if (this.heading == WEST || this.heading == EAST) {
      this.heading = SOUTH;
    }
  }
}
