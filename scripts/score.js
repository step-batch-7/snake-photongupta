class Score {
  constructor(initialScore) {
    this.score = initialScore;
  }

  updateScore(points) {
    this.score += points;
  }

  getStatus() {
    return this.score;
  }
}
