import { updatedTime, playSound } from "../helpers/general.js";
import { handleCities } from "../helpers/getSelectOptions.js";
import { handlePrayers } from "../helpers/getPrayersTimes.js";

export function Caller(compareTimeWithPrayer) {
  function render() {
    $(".mainContainer").html(`      <section id="Caller" class="Caller general">
        <div class="layer" style="background: url(assets/images/CallerBack.png)"></div>
        <div class="top">
          <div class="container grid-2 h-100">
            <div class="right position-relative">
              <span class="position-absolute">حي علي الصلاة</span>
              <img src="images/CallerMosque.png" />
              <span class="position-absolute">حي علي الفلاح</span>
            </div>
            <div class="left">
              <h2>حان الآن موعد</h2>
              <div class="CallerName">أذان <span  class="prayerName"></span></div>
              <div class="main-text gap-1">
                <div class="right mx-1">
                  <span>الوقت الآن</span>
                  <span  class="afContainer"></span>
                </div>

                <h5 class="timeContainer"></h5>
              </div>
              <h6 class="d-flex myDate">
                
              </h6>
              <div
                class="customSelect small dark"
                id="city"
                data-awesome="fa-regular fa-location-dot"
                data-title="المدينة"
                data-titleonly="true"
              >
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="container">
            <div class="prayers">
         
            </div>
          </div>
        </div>
      </section>`);
  }

    function handle() {
        if (document.getElementById("Caller") == null) {
            render();
            $(".prayerName").text(compareTimeWithPrayer.nextPrayer.arName);
            playSound("prayer");

            $(".myDate").hijriDate({ showGregDate: true });
            updatedTime("timeContainer", "afContainer");
            handlePrayers();
            handleCities();
        }
  }
  handle();
}
