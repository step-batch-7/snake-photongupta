class Food {
  constructor(position, type) {
    this.position = position.slice();
    this.foodType = type;
    this.count = 1;
  }

  updatePosition() {
    this.foodType = 'normal';
    if (this.count % 5 == 0) {
      this.foodType = 'special';
    }
    this.position = getRandomFood();
    this.count++;
  }
}
