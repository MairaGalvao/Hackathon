const express = require('express')
const app = express()
const accessKey = '3yhz4zai60zzxn';
const fetch = require('node-fetch');
const port = 3000

const cityRowData = async function (country, city) {
    return new Promise((resolve, reject) => {
        const urlCity = `https://www.numbeo.com/api/city_healthcare?api_key=${accessKey}&query=${city}, ${country}`;
        const res = fetch(urlCity).then(res => res.json())
        resolve(res)
    }) //when we have time, understand if there is a need for the code above
}
const fetchData = async function (country, city) {
    const result = await cityRowData(country, city)
    return (result)
}

app.get('/health', (req, res) => {
    console.log(req.query)
    const cityUser = req.query.city
    const countryUser = req.query.country
    fetchData(countryUser, cityUser).then(jsonData => res.send(jsonData))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})