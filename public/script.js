
const insertDataDom = (data, param, insideText) => {   // param = 'cost' / 'speed'
    let divResult = document.getElementById('result')
    let myDiv = document.createElement('div')
    let mySpan = document.createElement('span')
    mySpan.id = 'icon' + param
    mySpan.innerHTML = insideText
    mySpan.style = 'font-size:50px;'
    myDiv.id = param
    myDiv.innerHTML = data[param]
    //todo replace content instead of creating a new div each time the user clicks on the button
    myDiv.appendChild(mySpan)
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
            // todo convert data to %
            insertDataDom(data, 'cost', '💳')
            insertDataDom(data, 'speed', '⏱')
            insertDataDom(data, 'skill_and_competency', '💪')
            // insertDataDom(data, 'responsiveness_waitings')
            // insertDataDom(data, 'accuracy_and_completeness')
            console.log('Your query count: ', data);
        }
    }

    getJSON(url, callThisWhenYouGetData);

}

function explain(){
    let myDiv = document.getElementById('explain')
    if (myDiv.textContent.trim() == 'What is this?') {
        myDiv.innerHTML = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    } 
    else {
        myDiv.innerHTML = 'What is this?'
    }
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


