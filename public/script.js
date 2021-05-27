const getData=()=>{
    // upon click, redirect to /health. 
    // this will call the relevant route in the server, which will do an API call to Nambeu.
    // the results will be shown on the /health route
    let cityUser = document.getElementById('city').value
    let countryUser = document.getElementById('country').value
    cityUser = cityUser.split(' ').join('+');
    countryUser = countryUser.split(' ').join('+');
    location.href = `http://localhost:3000/health?city=${cityUser}&country=${countryUser}`
}