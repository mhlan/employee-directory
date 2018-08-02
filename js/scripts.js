//constant variables
const main = document.querySelector("#main");
const boxes = document.querySelectorAll(".box");
const modalWindow = document.querySelector(".modal");
const modalBG = document.querySelector(".modal-background");
const modalClose = document.querySelector(".modal-close");
const images = document.querySelectorAll(".img");
const names = document.querySelectorAll(".subtitle.is-3");
const emails = document.querySelectorAll(".email");
const locations = document.querySelectorAll(".location");

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

fetch("https://randomuser.me/api/")
  .then(checkStatus)
  .then(res => res.json())
  .then(data => {
    const picture = data.results[0].picture.large;
    const firstName = data.results[0].name.first;
    const lastName = data.results[0].name.last;
    const email = data.results[0].email;
    const city = data.results[0].location.city;
    const state = data.results[0].location.state;

    fillDirectory(firstName, lastName, picture, email, city, state);
  })
  .catch(error => console.log("Looks like there was a problem", error));

function checkStatus(response) {
  if (response.ok === true) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function fillDirectory(firstName, lastName, picture, email, city, state) {
  images[0].src = picture;
  names[0].innerHTML = `${firstName} ${lastName}`;
  emails[0].innerHTML = email;
  locations[0].innerHTML = `${city}, ${state}`;
}
