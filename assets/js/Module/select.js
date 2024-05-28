export function Select(id, awesome, title,titleOnly=false) {
  let selected = $(`#${id} option:selected`);

  function generate() {
    emptyContainer();
      generateLabel();
      if (titleOnly == false) { generateList(); }
   
    $(`#${id} select`).remove();
  }
  function emptyContainer() {
    $(`#${id} label`).remove();
    $(`#${id} ul`).remove();
  }
  function generateLabel() {
    $(`#${id}`).append(`<label class="cp" data-id="${selected.val()}"
    ><span
      ><i class="${awesome} ml-2"></i
      ><span class="mainText"
        ><span class="ml-1">${title} :</span><span class="b">${selected.text()}</span></span
      ></span
    >${titleOnly == false ? "<i class='fa-solid fa-chevron-down updown'></i>" : ""}</label>`);
  }
  function generateList() {
    let html = "<ul style='display:none'>";
    $.each($(`#${id} option`), function (key, option) {
      html += `<li data-id="${$(option).val()}" class="cp" ${
        selected.val() == $(option).val() ?? 'selected="selected"'
      }>${$(option).text()}</li>`;
    });
    html += "</ul>";
    $(`#${id}`).append(html);
  }
  function slideToggle() {
    $(`#${id} ul`).slideToggle(100);
    $(`#${id} label .updown`)
      .toggleClass("fa-chevron-down")
      .toggleClass("fa-chevron-up");
  }
    $(`#${id}`).on("click", `label`, function () {
        if (titleOnly == false) { slideToggle(); }

    
  });
  $(`#${id}`).on("click", "ul li", function () {
    $(this).parent("ul").siblings("label").data("id", $(this).data("id"));
    $(this)
      .parent("ul")
      .siblings("label")
      .children("span")
      .children("span")
      .children("span.b")
      .text($(this).text());
    slideToggle();
  });
  window.addEventListener("click", function (e) {
    if (this.document.getElementById(id)) {
      if (!document.getElementById(id).contains(e.target)) {
        $(`#${id} ul`).slideUp(100);
      }
    }
  });
  generate();
}
export function getSelectVal(id) {
  return $("#" + id + " label").data("id");
}
export function getSelectText(id) {
  return $("#" + id + " label .mainText span.b").text();
}
export function generateOne(id) {
    Select(id, $(`#${id}`).data("awesome"), $(`#${id}`).data("title"), $(`#${id}`).data("titleonly")?? false);
}
export function generateSelect() {
  $.each($(".customSelect"), function () {
      Select($(this).attr("id"), $(this).data("awesome"), $(this).data("title"), $(this).data("titleonly") ?? false);
  });
}
