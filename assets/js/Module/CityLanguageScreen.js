import { handleCities, handleLanguages } from "../helpers/getSelectOptions.js";
import { saveMainSettingsData, saveMainSettingsDataToClient,getMainSettingsData } from "../helpers/mainSettingsData.js";
import { getRandomOfAzkarCaller } from "../helpers/getAzkar.js";
getRandomOfAzkarCaller();
export function CityLanguageScreen() {
  function render(mosqueImg = "assets/images/mosque.png") {
    $(".mainContainer").html(`    <section
        id="CityLanguageScreen"
        class="CityLanguageScreen general"
        style="
          background: url(${mosqueImg});
        "
      >
        <div
          class="content d-flex justify-content-center align-items-center flex-direction-column gap-4"
          style="
            background: url(images/CityLanguageScreen.png);
          "
        >
          <div
            class="customSelect"
            id="city"
            data-awesome="fa-regular fa-location-dot"
            data-title="المدينة"
          >
           
          </div>
          <div
            class="customSelect"
            id="language"
            data-awesome="fa-solid fa-language"
            data-title="اللغة"
          >
         
          </div>
          <button type="button" class="btn btn-custom" id="save">حفــظ</button>
        </div>
      </section>
      `);
  }

    async function handle() {

        let mainSettings = await getMainSettingsData();
        if (Object.keys(mainSettings).length && mainSettings.City != null && mainSettings.City != undefined) {
            Prayers();
        } else if (document.getElementById("CityLanguageScreen") == null) {
            render();
            handleCities();
            handleLanguages();
        }
  }
  handle();
  $(".mainContainer").on("click", "#save", function () {
    let cityId = getCustomSelectVal("city"),
      cityName = getCustomSelectText("city"),
      languageId = getCustomSelectVal("language");
    if (cityId && languageId) {
        let obj = { City: cityId, CityAr: cityName, Lang: languageId };
        saveMainSettingsData(obj);
    }
  });
}
