import { handleCities } from "../helpers/getSelectOptions.js";

import { updatedTime } from "../helpers/general.js";
import { handlePrayers } from "../helpers/getPrayersTimes.js";
export function Prayers() {
  function render() {
    $(".mainContainer").html(`
        <section class="PrayersScreen general" id="PrayersScreen">
        <div class="top">
          <div class="layer">
            <img src="images/mosque2.png" alt="" />
          </div>
          <div class="container h-100">
  
            <div class="grid-2 h-100">
            
              <div class="content d-flex">
              <div class="d-flex">
              <div
                class="customSelect small"
                id="city"
                data-awesome="fa-regular fa-location-dot"
                data-title="المدينة"
                data-titleonly="true"
              >
              </div>
              </div>

              <div class="subcontent position-relative">
                <div class="main-text">
                  <span>.. الوقت الآن ..</span>
                  <h5><p class="timeContainer"></p><span class="mx-1 afContainer"></span></h5>
                </div>
                <h6 class="myDate d-flex">
                  
                </h6>
              </div>
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
        if (document.getElementById("PrayersScreen") == null) {
            render();
            handlePrayers();
            handleCities();
            $(".myDate").hijriDate({ showGregDate: true });
            updatedTime("timeContainer", "afContainer");
        }
  }
  handle();
}
