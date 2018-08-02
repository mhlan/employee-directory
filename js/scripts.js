//constant variables
const main = document.querySelector("#main");
const modalWindow = document.querySelector(".modal");
const modalBG = document.querySelector(".modal-background");
const modalClose = document.querySelector(".modal-close");

//toggle modal window on
main.addEventListener("click", e => {
  console.log(e.target);
  let selection = e.target.classList.value;
  if (
    selection === "box" ||
    selection === "img is-rounded" ||
    selection === "subtitle is-3" ||
    selection === "email" ||
    selection === "location"
  ) {
    modalWindow.classList.add("is-active");
  }
});

//closes modal window on clicking "x" button
modalClose.addEventListener("click", () =>
  modalWindow.classList.remove("is-active")
);
//closes modal window on clicking anywhere but modal content box
modalBG.addEventListener("click", () =>
  modalWindow.classList.remove("is-active")
);
