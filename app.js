const form = document.querySelector("#weatherForm");
const button = document.querySelector("button");
let weatherName = document.querySelector(".weather-Name")
let image = document.querySelector("img");
let temperatureName = document.querySelector(".temp-name")
let temperatureNumber = document.querySelector(".temp-num");
let tempDegree = document.querySelector(".temp")
let showCity = document.querySelector(".curCity")
let showTime = document.querySelector(".curTime")


form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const cityName = form.elements.query.value
    // const config = { prarams: { q: cityName,  appid: apiKey}}
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f4ba1c5c45874efb70c3f391ae05af62&units=imperial`)

    let temperatureName = res.data.weather[0].main
    displayTempName(temperatureName);

    let imgSrc = `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`
    displayIcon(imgSrc)

    let degree = res.data.main.temp
    console.log(degree)
    displayTempNumber(degree);

    let city = res.data.name
    displayCity(city);

    let cityTimeZone = res.data.timezone
    generateTime(cityTimeZone);

})

function generateTime(timeZone) {
    let d = new Date()
    let localTime = d.getTime()
    let localOffset = d.getTimezoneOffset() * 60000
    let utc = localTime + localOffset
    var cityTime = utc + (1000 * timeZone)
    let newDate= new Date(cityTime)
    showTime.innerText = newDate;
}

function displayIcon (source) {
    image.src = source;
}

function displayTempName (tempName) {
    temperatureName.innerText = tempName;
}

function displayTempNumber (tempNum) {
    temperatureNumber.innerText = `${tempNum}F`;
}

function  displayCity (city) {
    showCity.innerText = city
}
