import { handleTitle, playSound } from "../helpers/general.js";
import { getMainSettingsData } from "../helpers/mainSettingsData.js";

export function reminderPerformingPrayer(compareTimeWithPrayer) {
  function generate() {
    $(".mainContainer").html(`    <section
        id="reminderPerformingPrayer"
        class="reminderPerformingPrayer d-flex"
      >
        <div
          class="right"
          style="
            background-image: url(images/reminderPerformingPrayerMosque.png);
          "
        >
          <img
            class="mainMosque"
            src="images/reminderPerformingPrayerMainMosque.png"
          />
        </div>
        <div class="left">
          <div class="container">
          ${handleTitle("تذكير بإقامة الصلاة")}
            <div class="content">
              <p>حان الآن موعد إقامة</p>
              <h6>صلاة <span  class="prayerName"></span></h6>
              <p>حسب التوقيــت المحــلى <br />لمدينــة <span class="city"></span></p>
            </div>
          </div>

          <p class="footer position-relative container">صلى قبل أن يصلى عليك</p>
        </div>
      </section>`);
  }
    async function render() {
        if (document.getElementById("reminderPerformingPrayer") == null) {
            generate();
            let mainSettings = await getMainSettingsData();
            $(".city").text(mainSettings.CityAr);
            $(".prayerName").text(compareTimeWithPrayer.nextPrayer.arName);

            playSound("performing");
        }
  }
  render();
}
