export async function getMainSettingsData() {
    let response = await fetch("/api/GetSettings");
    let jsonRes = await response.json();
    return jsonRes;
}
//export async function getMainSettingsData() {
//    let response = getMainSettingsDataFromClient();
//    if (response != null) { return response; } else {
//        let response = await fetch("/Api/Values/GetSettings");
//        let jsonRes = await response.json();
//        if (Object.keys(jsonRes).length && jsonRes.City != undefined && jsonRes.City != null) {
//            saveMainSettingsDataToClient(jsonRes);
//        }
//        return jsonRes;
//    }

//}
export async function saveMainSettingsData(data) {
    try {
        let response = await fetch("/api/SaveSettings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
        });

      
  } catch (error) {
     
  }
}
export function getMainSettingsDataFromClient() {
    let data = localStorage.getItem("mainSettings");
  //return data == null
  //  ? { City: "Riyadh", CityAr: "الرياض", Lang: "ar" }
    //  : JSON.parse(data);
  return JSON.parse(data);
}
export function saveMainSettingsDataToClient(data) {
  localStorage.setItem("mainSettings", JSON.stringify(data));
  Prayers();
}
