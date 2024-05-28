export let handleDoubleZero = (num) => (num < 10 ? `0${num}` : num);
export let convertToSeconds = (
  seconds = 0,
  minutes = 0,
  hours = 0,
  subtraction = 0
) => seconds + minutes * 60 + hours * 3600 - subtraction;
export let handleTitle = (title) => `<div class="title">${title}</div>`;
export function updateTime() {
    let currentTime = new Date();
  let cHours = currentTime.getHours();
  let cMinutes = currentTime.getMinutes();
  return {
    Hours:
      cHours > 12
        ? cHours - 12 < 10
          ? `0${cHours - 12}`
          : cHours - 12
        : cHours < 10
        ? `0${cHours}`
        : cHours,
    Minutes: cMinutes < 10 ? `0${cMinutes}` : cMinutes,
    AF: cHours > 12 ? "PM" : "AM",
  };
}
export function updatedTime(main, afClass) {
  let mainContainer = document.querySelector(`.${main}`),
    afContainer = document.querySelector(`.${afClass}`);
  let nInterval;

  let handleUpdate = () => {
    let newTime = updateTime();
    mainContainer.textContent = `${newTime.Hours}:${newTime.Minutes}`;
    afContainer.textContent = `${newTime.AF}`;
    if (!mainContainer || !afContainer) {
      clearInterval(nInterval);
    }
  };
  nInterval = setInterval(handleUpdate, 1000);
  handleUpdate();
}
export function getDateNow() {
  let d = new Date();
  return {
    Year: d.getFullYear(),
    Month: d.getMonth() + 1,
    Day: d.getDate(),
  };
}
export function getTimeNow() {
  let currentTime = new Date();
  return {
    Hours: currentTime.getHours(),
    Minutes: currentTime.getMinutes(),
    Seconds: currentTime.getSeconds(),
  };
}

export async function compareTimeNowWithPrayers(compareWith, prayersTimes) {
  let timeNow = getTimeNow();
  // Extract hours and minutes from the current time
  let currentHours = parseInt(timeNow.Hours);
  let currentMinutes = parseInt(timeNow.Minutes);

  // Loop through prayer times and compare with the current time
  for (let prayer in prayersTimes) {
    let prayerHours = parseInt(prayersTimes[prayer].hour);
    let prayerMinutes = parseInt(prayersTimes[prayer].minutes);
    let af = prayersTimes[prayer].af;

    if (af === "PM" && prayerHours !== 12) {
      prayerHours += 12;
    }
    // Calculate the time difference in minutes
    let timeDifference =
      (prayerHours - currentHours) * 60 + (prayerMinutes - currentMinutes);
    // Compare the times
    if (compareWith(timeDifference)) {
      return {
        nextPrayer: prayersTimes[prayer],
        timeDifference: timeDifference * 60,
      };
    }
  }
  return { nextPrayer: null };
}
export function playSound(audio) {
  var audio = new Audio(`sounds/${audio}.mp3`);
  audio.play();
}
