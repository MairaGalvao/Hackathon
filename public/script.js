const startLoading = () => {
  let myLoader = document.getElementById("loader");
  myLoader.style.display = "block";
};

const endLoading = () => {
  let myLoader = document.getElementById("loader");
  myLoader.style.display = "none";
};

const displayError = (message) => {
  hideResults();
  endLoading();
  let errorDiv = document.getElementById("error");
  errorDiv.style.display = "block";
  errorDiv.innerHTML = message;
};

const hideError = () => {
  let errorDiv = document.getElementById("error");
  errorDiv.style.display = "none";
};

const hideResults = () => {
  let divResult = document.getElementById("result");
  divResult.style.display = "none";
};

const insertDataDom = (data, param, insideText) => {
  let divResult = document.getElementById("result");
  let myDiv = document.getElementById(param);

  // check if div already exist, if so, replace its content
  if (myDiv == null) {
    myDiv = document.createElement("div");
  }
  let emojiSpan = document.createElement("span");

  emojiSpan.id = "icon" + param;
  emojiSpan.innerHTML = insideText;

  emojiSpan.style = "font-size:50px;";
  myDiv.id = param;
  myDiv.style =
    "display: flex;flex-direction: column;align-items: center; justify-content: center;font-size: 25px; font-family: system-ui;    background-color: white;    border-radius: 10px;    padding: 5px;    ";
  const percentageData = convertToPercentage(data[param]);

  myDiv.innerHTML = `${param.split("_").join(" ")}: ${percentageData}% `;
  myDiv.appendChild(emojiSpan);
  divResult.appendChild(myDiv);
};

const convertToPercentage = (number) => {
  // number is between -2 to 2
  const numberPlusTwo = number + 2;
  const myTotal = 4;
  const percentage = (numberPlusTwo * 100) / myTotal;
  return Math.round(percentage);
};

const getData = () => {
  // upon click, redirect to /health.
  // this will call the relevant route in the server, which will do an API call to Nambeu.
  // the results will be shown on the /health route
  startLoading();
  hideError();
  let cityUser = document.getElementById("city").value;
  let countryUser = document.getElementById("country").value;
  cityUser = cityUser.split(" ").join("+");
  countryUser = countryUser.split(" ").join("+");

  if (cityUser.length === 0 || countryUser.length === 0) {
    displayError("Must insert valid country and city");
    return;
  }

  //todo add toUppercase sensitive - to be able to search for a country with lower caps
  const url = `http://localhost:3000/health?city=${cityUser}&country=${countryUser}`;

  const callThisWhenYouGetData = function (err, data) {
    if (err !== null) {
      console.log("Something went wrong: " + err);
      endLoading();
      displayError(data.error);
    } else {
      displayData(data);
      endLoading();
    }
  };
  getJSON(url, callThisWhenYouGetData);
};

const displayData = (data) => {
  convertToPercentage(data.cost);

  insertDataDom(data, "cost", "💳");
  insertDataDom(data, "speed", "⏱");
  insertDataDom(data, "skill_and_competency", "💪");
  insertDataDom(data, "modern_equipment", "⚗️");
  insertDataDom(data, "friendliness_and_courtesy", "😊");
  insertDataDom(data, "responsiveness_waitings", "⌛");
};

function explain() {
  let myDiv = document.getElementById("explain");
  if (myDiv.textContent.trim() == "What is this website?") {
    myDiv.innerHTML =
      "Health Forecast is a website that provides information about healthcare perceptions in a city.<br>Among the measures that the website provides are costs, the speed in the appointments, how responsive the staff is in terms of waiting times, and friendliness nature of the services provided on all the cities in the world.";
    myDiv.style.width = "850px";
  } else {
    myDiv.innerHTML = "What is this?";
    myDiv.style.width = "200px";
  }
}

function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200 && !xhr.response.error) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  //todo the loading when the url has been fetching
  xhr.send(); // todo uncomment this when you want to fetch REAL data
  // const tlvDummyData = {
  //   skill_and_competency: 1.3533834586466165,
  //   cost: 0.9924812030075187,
  //   responsiveness_waitings: 0.015384615384615385,
  //   index_healthcare: 74.64334034941481,
  //   speed: 0.8120300751879699,
  //   accuracy_and_completeness: 1.096774193548387,
  //   friendliness_and_courtesy: 0.7404580152671756,
  //   insurance_type: {
  //     "Employer Sponsored": 6.015037593984962,
  //     Private: 17.293233082706767,
  //     Public: 74.43609022556392,
  //     None: 2.2556390977443606,
  //   },
  //   modern_equipment: 1.6564885496183206,
  //   name: "Tel Aviv-Yafo, Israel",
  //   monthLastUpdate: 5,
  //   location: 1.2121212121212122,
  //   contributors: 133,
  //   yearLastUpdate: 2021,
  //   city_id: 6845,
  // };
  // callback(null, tlvDummyData);
}
