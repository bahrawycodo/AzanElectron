import { handleTitle } from "../helpers/general.js";

export function remainingTimeToPray(timeCompared) {
  function generate() {
    $(".mainContainer")
      .html(`     <section class="remainingTimeToPray" id="remainingTimeToPray">
        <div class="top">
          <div class="container">
          ${handleTitle("الوقت المتبقي حتي الإقامة")}
            <div class="timerContainer" id="timerContainer"></div>
          </div>
        </div>
        <div class="footer">
          <div class="container position-relative">
            <p>
              إن أحدكم إذا توضأ فأحسن وأتى المسجد لايريد إلا الصلاة لم يخط خطوة
              إلا رفعه الله بها درجة وحط عنه خطيئة حتى يدخل المسجد
            </p>
            <img src="images/remainingTimeToPrayMosque.png" />
          </div>
        </div>
      </section>`);
  }
    function render() {
        if (document.getElementById("remainingTimeToPray") == null) {
            generate();
            Timer("timerContainer", timeCompared * 60);
        }
  }
  render();
}
