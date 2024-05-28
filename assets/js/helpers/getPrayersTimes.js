import { getMainSettingsData } from "./mainSettingsData.js";
import { getDateNow } from "./general.js";
import { Prayers } from "../Module/Prayers.js";

export async function getPrayersTimes() {
    let data = await getPrayersTimesForOneDay();
    if (data != undefined) {
        return getTimingsWithFormat(data.timings, formatTime);
    }
}
async function getPrayersTimesFromApi(dateNow, city) {
  let response = await fetch(
    `https://api.aladhan.com/v1/calendarByCity/${dateNow.Year}?city=${city}&country=KSA&method=4`
  );
  return await response.json();
}
async function getPrayersTimesFromResources(city) {
  let response = await fetch(`resources/Azan_KSA/Azan_${city}.json`);
  return await response.json();
}
async function handleGetPrayersTimesFrom() {
    let mainSettings = await getMainSettingsData();
    var city = mainSettings.City;
    if (city != undefined && city != null) {
        let dateNow = getDateNow();
        let oldPrayers = JSON.parse(localStorage.getItem("Prayers"));
        if (
            oldPrayers == null ||
            oldPrayers.Date.Year != dateNow.Year ||
            oldPrayers.City != city
        ) {
            let data;
            try {
                data = await getPrayersTimesFromApi(dateNow, city);
            } catch (error) {
                data = await getPrayersTimesFromResources(city);
            }
            let obj = {
                City: city,
                Date: dateNow,
                timings: data.data,
            };
            localStorage.setItem("Prayers", JSON.stringify(obj));

            return obj;
        } else {
            return oldPrayers;
        }
    }
}
async function getPrayersTimesForOneDay() {
    let data = await handleGetPrayersTimesFrom();
    if (data != undefined) {

        let dateNow = getDateNow();
        return {
            ...data,
            timings: data.timings[dateNow.Month][dateNow.Day - 1].timings,
        };
    }
}
function getTimingsWithFormat(timings, format) {
  return {
    Fajr: addNameToPrayer(format(timings.Fajr), "الفجر"),
    Dhuhr: addNameToPrayer(format(timings.Dhuhr), "الظهر"),
    Asr: addNameToPrayer(format(timings.Asr), "العصر"),
    Maghrib: addNameToPrayer(format(timings.Maghrib), "المغرب"),
    Isha: addNameToPrayer(format(timings.Isha), "العشاء"),
  };
}
function addNameToPrayer(timing, name) {
  timing.arName = name;
  return timing;
}
function splitTime(time) {
  let timeCutted = time.substring(0, time.indexOf(" "));
  let hour = parseInt(time.substring(0, time.indexOf(":")));
  let minutes = parseInt(time.substring(timeCutted.indexOf(":") + 1));
  return {
    timeCutted,
    hour,
    minutes,
  };
}
function formatTime(time) {
  let SplitedTime = splitTime(time);
  if (SplitedTime.hour < 12) {
    return {
      time: SplitedTime.timeCutted,
      af: "AM",
    };
  } else {
    let Hour = SplitedTime.hour - 12;
    Hour = Hour < 10 ? "0" + Hour : Hour;
    let Minutes =
      SplitedTime.minutes < 10
        ? "0" + SplitedTime.minutes
        : SplitedTime.minutes;
    return {
      time: `${Hour}:${Minutes}`,
      af: "PM",
    };
  }
}
export async function getPrayerswithSplitedFormat() {
    let data = await getPrayersTimesForOneDay();
    if (data != undefined) {
        return getTimingsWithFormat(data.timings, splitedFormat);
    }
}

function splitedFormat(time) {
  let SplitedTime = splitTime(time);
  if (SplitedTime.hour < 12) {
    return {
      hour: `${SplitedTime.hour}`,
      minutes: `${SplitedTime.minutes}`,
      af: "AM",
    };
  } else {
    return {
      hour: `${SplitedTime.hour - 12}`,
      minutes: `${SplitedTime.minutes}`,
      af: "PM",
    };
  }
}
export function handlePrayerContainer(time, name, iconName, active = false) {
  return `      <div class="prayer ${active ?? "active"}">
    <svg 
     
     viewBox="0 0 287.71 317.508"
   >
     <defs xmlns="http://www.w3.org/2000/svg">
       <linearGradient
         id="prayer-shape-gradient"
         x1="0.5"
         y1="0.815"
         x2="0.5"
         y2="0.185"
         gradientUnits="objectBoundingBox"
       >
         <stop offset="0" stop-color="var(--color-stop)" />
         <stop offset="0.001" stop-color="var(--color-stop)" />
         <stop
           offset="1"
           stop-color="var(--color-bot)"
           stop-opacity="0"
         />
       </linearGradient>
     </defs>
     <path
       id="Rounded_Rectangle_"
       data-name="Rounded Rectangle "
       d="M2905.387,1172.168l54.246-56.7a19.374,19.374,0,0,1,27.393-.605l56.7,54.245a19.374,19.374,0,0,1,.605,27.393l-54.246,56.7a19.373,19.373,0,0,1-27.392.605l-56.7-54.245A19.374,19.374,0,0,1,2905.387,1172.168Z"
       transform="translate(-2831.97 -1109.492)"
       fill="var(--main-color)"
     />
     <g
       id="Rounded_Rectangle_1"
       data-name="Rounded Rectangle 1"
       transform="translate(-2831.97 -1109.492)"
     >
       <g
         id="Rounded_Rectangle_1-2"
         data-name="Rounded Rectangle 1"
         transform="translate(2831.97 1139.29)"
         stroke-linejoin="round"
         stroke-width="10"
         stroke="var(--main-color)"
         fill="var(--main-color)"
       >
         <rect
           width="287.71"
           height="287.71"
           rx="50"
           stroke="none"
         />
         <rect
           x="5"
           y="5"
           width="277.71"
           height="277.71"
           rx="45"
           fill="none"
         />
       </g>
       <path
         id="Gradient_Overlay"
         data-name="Gradient Overlay"
         d="M2881.97,1139.29h187.71a50,50,0,0,1,50,50V1377a50,50,0,0,1-50,50H2881.97a50,50,0,0,1-50-50V1189.29A50,50,0,0,1,2881.97,1139.29Z"
         opacity="0.3"
         fill="url(#prayer-shape-gradient)"
       />
     </g>
   </svg>
   <div class="content">
     <i class="fa-solid ${iconName}"></i>
     <h6>أذان ${name}</h6>
     <h5>${time.time}<span>${time.af}</span></h5>
   </div>
 </div>`;
}
export async function handlePrayers(className = "prayers", active = null) {
    let prayers = await getPrayersTimes();
    if (prayers == undefined) return undefined;
  $(".prayers").html(`  
      ${handlePrayerContainer(
        prayers.Fajr,
        prayers.Fajr.arName,
        "fa-moon",
        active != null && active == "Fajr"
      )}
      ${handlePrayerContainer(
        prayers.Dhuhr,
        prayers.Dhuhr.arName,
        "fa-sun",
        active != null && active == "Dhuhr"
      )}
      ${handlePrayerContainer(
        prayers.Asr,
        prayers.Asr.arName,
        "fa-duotone fa-sun",
        active != null && active == "Asr"
      )}
      ${handlePrayerContainer(
        prayers.Maghrib,
        prayers.Maghrib.arName,
        "fa-sunset",
        active != null && active == "Maghrib"
      )}
      ${handlePrayerContainer(
        prayers.Isha,
        prayers.Isha.arName,
        "fa-moon-stars",
        active != null && active == "Isha"
      )}

                `);
}
