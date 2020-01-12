class Food {
  constructor(position) {
    this.position = position.slice();
  }

  updatePosition() {
    this.position = getRandomFood();
  }
}
