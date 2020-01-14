class Score {
  constructor(initialScore) {
    this.score = initialScore;
  }

  increaseScore(type) {
    this.score++;
    if (type == 'special') {
      this.score = this.score + 4;
    }
  }
}
