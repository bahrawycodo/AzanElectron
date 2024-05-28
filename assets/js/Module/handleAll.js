export function handleAll() {
  //console.log("All");
}
function deleteItem(id, el) {
  Swal.fire({
    title: "Do you Want To Delete User",
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      $.post("/User/Delete", { id: id.trim() }, function (res) {
        if (res.message == "Success") {
          swal.fire({
            title: "Deleted Succesfully",
            html: res.message,
            timer: 2000,
            icon: "success",
          });

          // removing
          $(el).closest("tr").remove();
        } else {
          swal.fire({
            title: "Can't delete",
            html: res.message,
            icon: "error",
          });
        }
      });
    } else if (result.isDenied) {
      swal.close();
    }
  });
}
