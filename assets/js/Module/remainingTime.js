import { Counter } from "../helpers/counter.js";
import { handleTitle, updatedTime, playSound } from "../helpers/general.js";
import { getMainSettingsData } from "../helpers/mainSettingsData.js";

export function remainingTime(compareTimeWithPrayer) {
  function render() {
    $(".mainContainer").html(`
        <section id="remainingTime" class="general remainingTime">
        <div
          class="top position-relative"
          style="background: url(images/remainingBackground.png)"
        >
          <div class="content">
            <div class="main-text gap-1">
              <div class="right mx-1">
                <span>الوقت الآن</span>
                <span class="afContainer"></span>
              </div>

              <h5 class="timeContainer"></h5>
            </div>
            <h6 class="d-flex myDate">
              
            </h6>
          </div>
        </div>
        <div class="bottom">
          <div class="layer"><img src="images/remainingMosque.png" /></div>
          <div class="container-fluid position-relative h-100">
            ${handleTitle("الوقت المتبقي حتي الآذان")}
            <div class="content grid-2 h-100">
              <h5>الوقت المتبقي حتي أذان <span  class="prayerName"></span></h5>
              <div class="TimeCounter f-flex gap-1">
                <div class="Time">
                  <div class="timetop f-flex gap-1">
                    <h4 class="value" id="secondsContainer">00</h4>
                    <span class="seperator">:</span>
                  </div>
                  <h6 class="Name">ثانية</h6>
                </div>
                <div class="Time">
                  <div class="timetop f-flex gap-1">
                    <h4 class="value" id="minutesContainer">00</h4>
                    <span class="seperator">:</span>
                  </div>
                  <h6 class="Name">دقيقة</h6>
                </div>
                <div class="Time">
                  <div class="timetop f-flex gap-1">
                    <h4 class="value" id="hoursContainer">00</h4>
                  </div>
                  <h6 class="Name">ساعة</h6>
                </div>
              </div>
            </div>
            <div class="footer">
              يرفع أذان <span class="prayerName"></span> في تمام الساعة <span class="prayerTime"></span> <span class="prayerAF"></span> حسب
              التوقيت المحلي لمدينة <span class="city"></span>
            </div>
          </div>
        </div>
      </section>
        `);
  }
    if (document.getElementById("remainingTime") == null) {
        render();
        playSound("notification");
        $(".myDate").hijriDate({ showGregDate: true });
        updatedTime("timeContainer", "afContainer");
        $(".city").text(getMainSettingsData().CityAr);
        if (compareTimeWithPrayer != undefined || compareTimeWithPrayer != null) {
            if (compareTimeWithPrayer.nextPrayer != null) {
                $(".prayerName").text(compareTimeWithPrayer.nextPrayer.arName);
                $(".prayerTime").text(
                    `${compareTimeWithPrayer.nextPrayer.hour}:${compareTimeWithPrayer.nextPrayer.minutes}`
                );
                $(".prayerAF").text(
                    compareTimeWithPrayer.nextPrayer.af == "AM" ? "صباحاً" : "مساءاً"
                );
                Counter(
                    compareTimeWithPrayer.timeDifference,
                    "secondsContainer",
                    "minutesContainer",
                    "hoursContainer"
                );
            }
        }
    }
}
