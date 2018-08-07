//constant variables
const main = document.querySelector("#main");
const boxes = document.querySelectorAll(".box");
const modalWindow = document.querySelector(".modal");
const modalBG = document.querySelector(".modal-background");
const modalClose = document.querySelector(".modal-close");
const col1 = document.querySelector("#col-1");
const col2 = document.querySelector("#col-2");
const col3 = document.querySelector("#col-3");
const col4 = document.querySelector("#col-4");

let counter = 0;

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

function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log("Looks like there was a problem", error));
}

function checkStatus(response) {
  if (response.ok === true) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

const writeHTML = colNum => (colNum.innerHTML += HTML);

function fillEmployeeInfo(firstName, lastName, picture, email, city, state) {
  const images = document.querySelectorAll(".img");
  const names = document.querySelectorAll(".subtitle.is-3");
  const emails = document.querySelectorAll(".email");
  const locations = document.querySelectorAll(".location");
  images[counter].src = picture;
  names[counter].innerHTML = `${firstName} ${lastName}`;
  emails[counter].innerHTML = email;
  locations[counter].innerHTML = `${city}, ${state}`;
}

const createEmployee = () => {
  if (counter < 3) {
    writeHTML(col1);
  } else if (counter < 6) {
    writeHTML(col2);
  } else if (counter < 9) {
    writeHTML(col3);
  } else if (counter < 12) {
    writeHTML(col4);
  }

  fetchData("https://randomuser.me/api/").then(data => {
    let picture = data.results[0].picture.large;
    let firstName = data.results[0].name.first;
    let lastName = data.results[0].name.last;
    let email = data.results[0].email;
    let city = data.results[0].location.city;
    let state = data.results[0].location.state;

    fillEmployeeInfo(firstName, lastName, picture, email, city, state);
    addToCount();
  });
};

const addToCount = () => (counter += 1);

const HTML = `<div class="column">
        <div class="box">
          <div class="media">
            <div class="media-left">
              <figure class="image is-128x128">
                <img class="img is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
              </figure>
            </div>
            <div class="media-content">
              <p class="subtitle is-3">John Smith</p>
              <div class="content">
                <div class="email">johnsmith@gmail.com</div>
                <div class="location">Mexico</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

(function() {
  console.log(counter);
  createEmployee();
  console.log(counter);
  createEmployee();
  console.log(counter);
  createEmployee();
  console.log(counter);
  createEmployee();
})();
//fetch data
//write html
//fill html with data
//repeat 11 more times
