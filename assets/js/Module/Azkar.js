import { handleTitle } from "../helpers/general.js";
import { getRandomOfAzkarCaller } from "../helpers/getAzkar.js";
export function Azkar() {
  function render() {
    $(".mainContainer").html(`<div class="Azkar" id="Azkar">
        <div class="clouds"></div>
        <div class="container position-relative">
        ${handleTitle("من الأذكار الواردة بعد الأذان")}
          <p class="azkarAfterCaller">
            
          </p>
        </div>
      </div>`);
    }
    if (document.getElementById("Azkar") == null) {
        render();
        getRandomOfAzkarCaller("azkarAfterCaller");
    }
}
