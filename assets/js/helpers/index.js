import { getPrayerswithSplitedFormat } from "./getPrayersTimes.js";
import { compareTimeNowWithPrayers } from "./general.js";
import { Prayers } from "../Module/Prayers.js";
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


let delayedExecutionRemaingTimeForPrayer = false;
async function updatedComparePrayersTime(prayersTimes) {
  let compareWith = (timeDifference) =>
    timeDifference <= 15 && timeDifference >= 0;

  let compareTimeWithPrayer = await compareTimeNowWithPrayers(
    compareWith,
    prayersTimes
  );

  if (compareTimeWithPrayer.nextPrayer != null) {
    if (delayedExecutionRemaingTimeForPrayer) {
      await sleep(45 * 60 * 1000);
      delayedExecutionRemaingTimeForPrayer = false;
    } else {
      remainingTime(compareTimeWithPrayer);
      delayedExecutionRemaingTimeForPrayer = true;
    }
  }
}
let delayedExecutionRemaingTimeForCaller = false;
async function updatedComparePrayersCallerTime(prayersTimes) {
  let compareWith = (timeDifference) =>
    timeDifference >= -5 && timeDifference <= 0;

  let compareTimeWithPrayer = await compareTimeNowWithPrayers(
    compareWith,
    prayersTimes
  );

  if (compareTimeWithPrayer.nextPrayer != null) {
    if (delayedExecutionRemaingTimeForCaller) {
      await sleep(45 * 60 * 1000);
      delayedExecutionRemaingTimeForCaller = false;
    } else {
        Caller(compareTimeWithPrayer);
      delayedExecutionRemaingTimeForCaller = true;
    }
  }
}
let delayedExecutionAzkarAfterCaller = false;
async function updatedCompareAzkarCallerTime(prayersTimes) {
  let compareWith = (timeDifference) =>
    timeDifference >= -10 && timeDifference <= -5;

  let compareTimeWithPrayer = await compareTimeNowWithPrayers(
    compareWith,
    prayersTimes
  );

  if (compareTimeWithPrayer.nextPrayer != null) {
    if (delayedExecutionAzkarAfterCaller) {
      await sleep(45 * 60 * 1000);
      delayedExecutionAzkarAfterCaller = false;
    } else {
      Azkar();
      delayedExecutionAzkarAfterCaller = true;
    }
  }
}
let delayedExecutionRemaingTimeForPerformingPrayer = false;

async function updatedComparePerformingPrayersTime(prayersTimes) {
  let timeCompared = 0;
  let compareWith = (timeDifference) => {
    timeCompared = 20 - timeDifference * -1;
    return timeDifference >= -20 && timeDifference <= -10;
  };

  let compareTimeWithPrayer = await compareTimeNowWithPrayers(
    compareWith,
    prayersTimes
  );

  if (compareTimeWithPrayer.nextPrayer != null) {
    if (delayedExecutionRemaingTimeForPerformingPrayer) {
      await sleep(45 * 60 * 1000);
      delayedExecutionRemaingTimeForPerformingPrayer = false;
    } else {
      remainingTimeToPray(timeCompared);
      delayedExecutionRemaingTimeForPerformingPrayer = true;
    }
  }
}
let delayedExecutionReminderPerformingPrayer = false;

async function updatedCompareReminderPerformingPrayersTime(prayersTimes) {
  let compareWith = (timeDifference) =>
    timeDifference >= -22 && timeDifference <= -20;

  let compareTimeWithPrayer = await compareTimeNowWithPrayers(
    compareWith,
    prayersTimes
  );

  if (compareTimeWithPrayer.nextPrayer != null) {
    if (delayedExecutionReminderPerformingPrayer) {
      await sleep(45 * 60 * 1000);
      delayedExecutionReminderPerformingPrayer = false;
    } else {
      reminderPerformingPrayer(compareTimeWithPrayer);
      delayedExecutionReminderPerformingPrayer = true;
    }
  }
}
let delayedExecutionAzkarAfterPrayer = false;

async function updatedCompareAzkarPerformingPrayersTime(prayersTimes) {
  let compareWith = (timeDifference) =>
    timeDifference >= -35 && timeDifference <= -22;

  let compareTimeWithPrayer = await compareTimeNowWithPrayers(
    compareWith,
    prayersTimes
  );

  if (compareTimeWithPrayer.nextPrayer != null) {
    if (delayedExecutionAzkarAfterPrayer) {
      await sleep(45 * 60 * 1000);
      delayedExecutionAzkarAfterPrayer = false;
    } else {
      AzkarAfterPrayer();
      delayedExecutionAzkarAfterPrayer = true;
    }
  }
}
let delayedExecutionPrayersSection = false;

async function updatedComparePrayersSection(prayersTimes) {
    let compareWith = (timeDifference) =>
        timeDifference > 15 && timeDifference <= -35;
    let compareTimeWithPrayer = await compareTimeNowWithPrayers(
        compareWith,
        prayersTimes
    );
    return compareTimeWithPrayer.nextPrayer;
}
async function executionFunctions(prayersTimes) {
  updatedComparePrayersTime(prayersTimes);
  updatedComparePrayersCallerTime(prayersTimes);
  updatedCompareAzkarCallerTime(prayersTimes);
  updatedComparePerformingPrayersTime(prayersTimes);
  updatedCompareReminderPerformingPrayersTime(prayersTimes);
    updatedCompareAzkarPerformingPrayersTime(prayersTimes);
}
async function executeOne() {
        setInterval(async () => {

          let prayersTimes = await getPrayerswithSplitedFormat();
          console.log(prayersTimes)
            if (prayersTimes != undefined) {
                if (await updatedComparePrayersSection() != null) {
                    executionFunctions(prayersTimes)
                } else {
                    Prayers();
                }
            } else { 
                CityLanguageScreen();
            }
        }, 1000);
    

}
executeOne();