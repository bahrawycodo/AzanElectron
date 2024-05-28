export function Timer(id, wholeTime) {
  let progressBar,
    displayOutput,
    length = Math.PI * 2 * 100;

  function generate() {
    $(`#${id}`).html(`
        <svg
        width="100%"
        viewBox="0 0 220 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style type="text/css">
          .e-c-base {
            fill: url(#MyGradient);
          }
        </style>
        <defs>
          <linearGradient id="MyGradient" gradientTransform="rotate(45)">
            <stop offset="0%" stop-color="#fff" />
            <stop offset="50%" stop-color="#fff" />
            <stop offset="100%" stop-color="#e2e2e2" />
          </linearGradient>
        </defs>
        <g transform="translate(110,110)">
          <circle r="100" class="e-c-base" />
          <g transform="rotate(-90)">
            <circle r="100" class="e-c-progress" />
          </g>
        </g>
      </svg>
      <div class="controls">
        <div class="display-remain-time">00:30</div>
        <div class="timerTitle"><span>دقيقة</span><span>ثانية</span></div>
      </div>
        `);
    progressBar = document.querySelector(".e-c-progress");
    displayOutput = document.querySelector(".display-remain-time");
    progressBar.style.strokeDasharray = length;
  }
  function timer() {
    update();
    displayTimeLeft();

    let timeLeft = wholeTime;
    setInterval(function () {
      timeLeft--;
      if (timeLeft < 0) {
        return;
      }
      update(timeLeft);
      displayTimeLeft(timeLeft);
    }, 1000);
  }
  function update(value = wholeTime) {
    progressBar.style.strokeDashoffset = -length - (length * value) / wholeTime;
  }
  function displayTimeLeft(timeLeft = wholeTime) {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayString = `${minutes < 10 ? "0" : ""}${minutes} : ${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    displayOutput.textContent = displayString;
  }
  function render() {
    generate();
    timer();
  }
  render();
}
