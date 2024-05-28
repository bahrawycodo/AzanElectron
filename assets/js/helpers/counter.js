import { handleDoubleZero, convertToSeconds } from "./general.js";
export function Counter(
  seconds,
  secondsContainer,
  minutesContainer,
  hoursContainer
) {
  secondsContainer = document.getElementById(secondsContainer);
  minutesContainer = document.getElementById(minutesContainer);
  hoursContainer = document.getElementById(hoursContainer);

  function countdown(seconds, minutes = 0, hours = 0) {
    function tick() {
      if (seconds > 3600) {
        hours = parseInt(seconds / 3600);
        seconds %= 3600;
      }
      if (seconds > 60) {
        minutes = parseInt(seconds / 60);
        seconds %= 60;
      }

      secondsContainer.innerHTML = handleDoubleZero(seconds);
      minutesContainer.innerHTML = handleDoubleZero(minutes);
      hoursContainer.innerHTML = handleDoubleZero(hours);

      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else if (minutes > 0 || hours > 0) {
        setTimeout(countdown(convertToSeconds(0, minutes, hours, 1)), 1000);
      }
      seconds--;
    }
    tick();
  }
  countdown(seconds);
}
