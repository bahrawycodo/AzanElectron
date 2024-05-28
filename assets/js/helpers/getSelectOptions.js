import { getMainSettingsData } from "./mainSettingsData.js";
async function getCitiesData() {
  let response = await fetch("resources/ksa-cities.json");
  return await response.json();
}
async function getLanguagesData() {
  let response = await fetch("resources/languages.json");
  return await response.json();
}

export async function handleCities(
  mainSettingCity = "Riyadh",
  container = "city"
) {
    let mainSettings =await  getMainSettingsData();
  if (mainSettings != null && mainSettings.City != null) {
      mainSettingCity = mainSettings.City;
  }
  let data = await getCitiesData();
  $(`#${container}`).html(`   <select>
        ${
          data && data.length
            ? data
                .map(
                  (city) =>
                    `<option value="${city.name_en}" ${
                      mainSettingCity && mainSettingCity == city.name_en
                        ? "selected"
                        : ""
                    }>${city.name_ar}</option>`
                )
                .join("")
            : ""
        }
      </select>`);
  customSelect(container);
}
export async function handleLanguages(
  mainSettingLanguage = "ar",
  container = "language"
) {
    let mainSettings = await getMainSettingsData();
  if (mainSettings != null && mainSettings.Lang != null) {
    mainSettingLanguage = mainSettings.Lang;
  }

  let data = await getLanguagesData();
  $(`#${container}`).html(`   <select>
        ${
          data && data.length
            ? data
                .map(
                  (language) =>
                    `<option value="${language.id}"   ${
                      mainSettingLanguage && mainSettingLanguage == language.id
                        ? "selected"
                        : ""
                    }>${language.name}</option>`
                )
                .join("")
            : ""
        }
      </select>`);

  customSelect(container);
}
