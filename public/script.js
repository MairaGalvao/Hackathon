const insertDataDom = (data, param) => {   // param = 'cost' / 'speed'
    let divResult = document.getElementById('result')
    let myDiv = document.createElement('div')
    myDiv.id = param
    myDiv.innerHTML = data[param]
    //todo replace content instead of creating a new div each time the user clicks on the button
    divResult.appendChild(myDiv)
}

const getData = () => {
    // upon click, redirect to /health. 
    // this will call the relevant route in the server, which will do an API call to Nambeu.
    // the results will be shown on the /health route
    let cityUser = document.getElementById('city').value
    let countryUser = document.getElementById('country').value
    cityUser = cityUser.split(' ').join('+');
    countryUser = countryUser.split(' ').join('+');
    //todo add toUppercase sensitive - to be able to search for a country with lower caps
    const url = `http://localhost:3000/health?city=${cityUser}&country=${countryUser}`

    const callThisWhenYouGetData = function (err, data) {
        if (err !== null) {
            console.log('Something went wrong: ' + err);
        } else {
            insertDataDom(data, 'cost')
            insertDataDom(data, 'speed')
            insertDataDom(data, 'skill_and_competency')
            insertDataDom(data, 'responsiveness_waitings')
            insertDataDom(data, 'accuracy_and_completeness')
            console.log('Your query count: ', data);

        }
    }

    getJSON(url, callThisWhenYouGetData);

}

function getJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    // xhr.send();             // todo uncomment this when you want to fetch REAL data
    const tlvDummyData = { "skill_and_competency": 1.3533834586466165, "cost": 0.9924812030075187, "responsiveness_waitings": 0.015384615384615385, "index_healthcare": 74.64334034941481, "speed": 0.8120300751879699, "accuracy_and_completeness": 1.096774193548387, "friendliness_and_courtesy": 0.7404580152671756, "insurance_type": { "Employer Sponsored": 6.015037593984962, "Private": 17.293233082706767, "Public": 74.43609022556392, "None": 2.2556390977443606 }, "modern_equipment": 1.6564885496183206, "name": "Tel Aviv-Yafo, Israel", "monthLastUpdate": 5, "location": 1.2121212121212122, "contributors": 133, "yearLastUpdate": 2021, "city_id": 6845 }
    callback(null, tlvDummyData)
};


