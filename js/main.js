// (function() {
//constant variables
const main = document.querySelector("#main");
const modalWindow = document.querySelector(".modal");
const modalBG = document.querySelector(".modal-background");
const modalClose = document.querySelector(".modal-close");
const col1 = document.querySelector("#col-1");
const col2 = document.querySelector("#col-2");
const col3 = document.querySelector("#col-3");
const col4 = document.querySelector("#col-4");

let boxes;

//functions
const createHTML = (picture, firstName, lastName, email, city, state) => {
  let HTML = `<div class="column">
        <div class="box">
          <div class="media">
            <div class="media-left">
              <figure class="image is-128x128">
                <img class="img is-rounded" src="${picture}">
              </figure>
            </div>
            <div class="media-content">
              <p class="subtitle is-4">${firstName + " " + lastName}</p>
              <div class="content">
                <div class="email">${email}</div>
                <div class="location">${city + ", " + state}</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

  return HTML;
};

const writeHTML = (colNum, picture, firstName, lastName, email, city, state) =>
  (colNum.innerHTML += createHTML(
    picture,
    firstName,
    lastName,
    email,
    city,
    state
  ));

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

//api fetch
fetch("https://randomuser.me/api/?results=12&nat=us&exc=login,registered,id")
  .then(checkStatus)
  .then(res => res.json())
  .then(data => {
    const employeeData = data.results;
    const employeeCount = employeeData.length;

    for (let i = 0; i < employeeCount; i++) {
      const picture = employeeData[i].picture.large;
      const firstName = capitalize(employeeData[i].name.first);
      const lastName = capitalize(employeeData[i].name.last);
      const email = employeeData[i].email;
      const city = capitalize(employeeData[i].location.city);
      const state = capitalize(employeeData[i].location.state);

      if (i < 3) {
        writeHTML(col1, picture, firstName, lastName, email, city, state);
      } else if (i < 6) {
        writeHTML(col2, picture, firstName, lastName, email, city, state);
      } else if (i < 9) {
        writeHTML(col3, picture, firstName, lastName, email, city, state);
      } else if (i < 12) {
        writeHTML(col4, picture, firstName, lastName, email, city, state);
      }
    }
    boxes = document.getElementsByClassName("column");

    for (let i = 0; boxes.length < i; i++) {
      boxes[i].addEventListener("click", modalView());
    }
  })
  .catch(error => console.log("Looks like there was a problem.", error));

function checkStatus(response) {
  if (response.ok === true) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

const modalView = () => modalWindow.classList.add("is-active");

//event listeners

// main.addEventListener("click", e => {
//   console.log(this);
//   let selection = e.target.classList.value;
//   if (
//     selection === "box" ||
//     selection === "img is-rounded" ||
//     selection === "subtitle is-3" ||
//     selection === "email" ||
//     selection === "location"
//   ) {
//     modalWindow.classList.add("is-active");
//   }
// });

//closes modal window on clicking "x" button
modalClose.addEventListener("click", () =>
  modalWindow.classList.remove("is-active")
);
//closes modal window on clicking anywhere but modal content box
modalBG.addEventListener("click", () =>
  modalWindow.classList.remove("is-active")
);
// })();
