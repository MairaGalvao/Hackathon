const getData=()=>{
    // upon click, redirect to /health. 
    // this will call the relevant route in the server, which will do an API call to Nambeu.
    // the results will be shown on the /health route
    location.href = 'http://localhost:3000/health?city=tel%20aviv&country=israel'
    
}