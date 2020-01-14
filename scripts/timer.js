const updateTimeLeft = function(count) {
  const timer = document.getElementsByClassName('timer');
  timer[0].innerText = `Time Left: ${count}s`;
};

class Timer {
  constructor(timeLimit) {
    this.timeLimit = timeLimit;
  }

  set() {
    const timerId = setInterval(() => {
      updateTimeLeft(this.timeLimit);
      this.timeLimit--;
    }, 1000);
    return timerId;
  }

  isTimeOut() {
    return this.timeLimit < 0;
  }
}
