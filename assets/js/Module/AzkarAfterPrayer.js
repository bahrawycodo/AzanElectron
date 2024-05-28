import { handleTitle } from "../helpers/general.js";
import { handleAzkarAfterPrayer } from "../helpers/getAzkar.js";
import { getMainSettingsData } from "../helpers/mainSettingsData.js";

export function AzkarAfterPrayer() {
  function generate() {
    $(".mainContainer")
      .html(`      <section id="AzkarAfterPrayer" class="AzkarAfterPrayer general">
        <div
          class="top"
          style="background-image: url(assets/images/azkarAfterPrayer.png)"
        ></div>
        <div class="line"></div>
        <div class="bottom">
          <div class="container">
          ${handleTitle("أذكار بعد السلام من الصلاة المفروضة")}
          <div class="AzkarAfterPrayerList"></div>
        
          </div>
        </div>
      </section>`);
  }
    function render() {
        if (document.getElementById("AzkarAfterPrayer") == null) {
            generate();
            handleAzkarAfterPrayer("AzkarAfterPrayerList");
        }
  }
  render();
}
