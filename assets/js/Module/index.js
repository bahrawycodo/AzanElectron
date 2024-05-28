import {
  generateSelect,
  getSelectVal,
  getSelectText,
  generateOne,
} from "./select.js";
import { CityLanguageScreen } from "./CityLanguageScreen.js";
import { Prayers } from "./Prayers.js";
import { remainingTime } from "./remainingTime.js";
import { Caller } from "./Caller.js";
import { Azkar } from "./Azkar.js";
import { Timer } from "./Timer.js";
import { remainingTimeToPray } from "./remainingTimeToPray.js";
import { reminderPerformingPrayer } from "./reminderPerformingPrayer.js";
import { AzkarAfterPrayer } from "./AzkarAfterPrayer.js";
import { handleAll } from "./handleAll.js";
window.customSelects = generateSelect;
window.customSelect = generateOne;
window.Timer = Timer;
window.getCustomSelectVal = getSelectVal;
window.getCustomSelectText = getSelectText;
window.CityLanguageScreen = CityLanguageScreen;
window.Prayers = Prayers;
window.Caller = Caller;
window.Azkar = Azkar;
window.remainingTime = remainingTime;
window.remainingTimeToPray = remainingTimeToPray;
window.reminderPerformingPrayer = reminderPerformingPrayer;
window.AzkarAfterPrayer = AzkarAfterPrayer;
window.handleAll = handleAll;
