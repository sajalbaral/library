const openBtn = document.getElementById("addButton");
const modal = document.getElementById("modal");
const insideModal = document.querySelector(".modal-inner");

openBtn.addEventListener("click", () => {
  modal.classList.add("open");
});

modal.addEventListener("click", (event) => {
  if (!insideModal.contains(event.target)) {
    modal.classList.remove("open");
  }
});
