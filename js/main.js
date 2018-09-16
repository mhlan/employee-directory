(function() {
  ///////////////////////
  //General Variable Declarations//
  ///////////////////////
  const main = document.querySelector("#main");
  const modalWindow = document.querySelector(".modal");
  const modalBG = document.querySelector(".modal-background");
  const modalClose = document.querySelector(".delete");
  const modalImg = document.querySelector("#modal-img");
  const modalName = document.querySelector("#modal-name");
  const modalEmail = document.querySelector("#modal-email");
  const modalCity = document.querySelector("#modal-city");
  const modalPhone = document.querySelector("#modal-phone");
  const modalAddress = document.querySelector("#modal-address");
  const modalDOB = document.querySelector("#modal-dob");
  const col1 = document.querySelector("#col-1");
  const col2 = document.querySelector("#col-2");
  const col3 = document.querySelector("#col-3");
  const col4 = document.querySelector("#col-4");

  let employeeData, boxes;
  ///////////////////////
  //Functions
  ///////////////////////

  //Creates requisite HTML for each employee card and interpolates relevant data
  const createHTML = (
    index,
    picture,
    firstName,
    lastName,
    email,
    city,
    state
  ) => {
    let HTML = `<div class="column">
        <div class="box" data-id="${index}">
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

  //Writes HTML for employee cards to page
  const writeHTML = (
    index,
    colNum,
    picture,
    firstName,
    lastName,
    email,
    city,
    state
  ) =>
    (colNum.innerHTML += createHTML(
      index,
      picture,
      firstName,
      lastName,
      email,
      city,
      state
    ));

  //Capitalizes the first character of each word
  const capitalize = str => {
    let words = str.toLowerCase().split(" ");

    for (let i = 0; i < words.length; i++) {
      let letters = words[i].split("");
      letters[0] = letters[0].toUpperCase();
      words[i] = letters.join("");
    }
    return words.join(" ");
  };

  //Fetches employee data and initiates HTML generation/writing for employee card elements
  fetch("https://randomuser.me/api/?results=12&nat=us&exc=login,registered,id")
    .then(checkStatus)
    .then(res => res.json())
    .then(data => {
      employeeData = data.results;
      const employeeCount = employeeData.length;

      for (let i = 0; i < employeeCount; i++) {
        const picture = employeeData[i].picture.large;
        const firstName = capitalize(employeeData[i].name.first);
        const lastName = capitalize(employeeData[i].name.last);
        const email = employeeData[i].email;
        const city = capitalize(employeeData[i].location.city);
        const state = capitalize(employeeData[i].location.state);

        if (i < 3) {
          writeHTML(i, col1, picture, firstName, lastName, email, city, state);
        } else if (i < 6) {
          writeHTML(i, col2, picture, firstName, lastName, email, city, state);
        } else if (i < 9) {
          writeHTML(i, col3, picture, firstName, lastName, email, city, state);
        } else if (i < 12) {
          writeHTML(i, col4, picture, firstName, lastName, email, city, state);
        }
      }
      boxes = document.querySelectorAll(".column");
    })
    .catch(error => console.log("Looks like there was a problem.", error));

  //Handles errors durring API call
  function checkStatus(response) {
    if (response.ok === true) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  //Formats date in DD/MM/YEAR format
  const dateFormatter = date =>
    (date = [date.slice(5, 10).replace("-", "/"), date.slice(0, 4)].join("/"));

  ///////////////////////
  //Event Listners
  ///////////////////////

  //Handles click events on employee cards, trigger modal view and displaying relevant card information in the modal window
  main.addEventListener("click", e => {
    if (e.target.closest(".box")) {
      let employeeBoxNumber = e.target.closest(".box").getAttribute("data-id");
      for (let i = 0; i < employeeData.length; i++) {
        if (i == employeeBoxNumber) {
          modalImg.setAttribute("src", `${employeeData[i].picture.large}`);
          modalName.innerText = `${capitalize(
            employeeData[i].name.first
          )} ${capitalize(employeeData[i].name.last)}`;
          modalEmail.innerHTML = employeeData[i].email;
          modalCity.innerHTML = capitalize(employeeData[i].location.city);
          modalPhone.innerHTML = employeeData[i].cell;
          modalAddress.innerHTML = `${capitalize(
            employeeData[i].location.street
          )}, ${capitalize(employeeData[i].location.state)} ${
            employeeData[i].location.postcode
          }`;
          let newDate = employeeData[i].dob.date.slice(0, 10);
          modalDOB.innerHTML = `Birthday: ${dateFormatter(newDate)}`;
        }
      }
      modalWindow.classList.add("is-active");
    }
  });

  //Closes modal window upon clicking the "x" button
  modalClose.addEventListener("click", () =>
    modalWindow.classList.remove("is-active")
  );

  //Closes modal window on clicking anywhere outside of modal content box
  modalBG.addEventListener("click", () =>
    modalWindow.classList.remove("is-active")
  );
})();
