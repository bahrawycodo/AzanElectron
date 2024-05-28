async function getAzkarAfterCallerData() {
  let response = await fetch("resources/AzkarAfterCaller.json");
  return await response.json();
}
async function getAzkarAfterPrayerData() {
  let response = await fetch("resources/AzkarAfterPrayer.json");
  return await response.json();
}
export async function getRandomOfAzkarCaller(className) {
  let data = await getAzkarAfterCallerData();
  $(`.${className}`).text(data[Math.floor(data.length * Math.random())] + " .");
}
export async function handleAzkarAfterPrayer(className, pageLength = 4) {
  let data = await getAzkarAfterPrayerData();
  let pages = Math.ceil(data.length / pageLength);
  function renderMainContainers() {
    $(`.${className}`).html(
      `<ul class="azkarList"></ul><ul class="points"></ul>`
    );
  }
  function renderList(page) {
    let html = ``;
    if (pages > 0 && page <= pages) {
      let start = pageLength * page - pageLength;
      let end =
        pageLength * page > data.length ? data.length : pageLength * page;
      for (let i = start; i < end; i++) {
        html += `<li data-number="${data[i].Number}">${data[i].Text}</li>`;
      }
      $(`.${className} .azkarList`).html(html);
    }
  }
  function renderPagnation() {
    let pagesHtml = ``;
    for (let index = 1; index <= pages; index++) {
      pagesHtml += `<li ${
        index == 1 ? 'class="active"' : ""
      } data-id="${index}"></li>`;
    }
    $(`.${className} .points`).html(pagesHtml);
  }
  renderMainContainers();
  renderPagnation();
  renderList(1);

  $(`.${className}`).on("click", ".points li", function () {
    $(this).addClass("active").siblings().removeClass("active");
    renderList($(this).attr("data-id"));
  });
  setInterval(() => {
    let selectedActive = parseInt(
      $(`.${className} .points li.active`).attr("data-id")
    );
    if (selectedActive == pages) {
      Prayers();
    } else {
      $(`.${className} .points li[data-id="${selectedActive + 1}"]`).click();
    }
  }, 30000);
}
