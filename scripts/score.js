class Score {
  constructor() {
    this.score = 0;
  }

  increaseScore(type) {
    this.score++;
    if (type == 'special') {
      this.score = this.score + 4;
    }
  }
}
