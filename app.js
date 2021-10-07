// Please note I am using axios to fetch the JSON data from the API
// Insert all the classes we need in variables

const form = document.querySelector("#weatherForm");
const button = document.querySelector("button");
let weatherName = document.querySelector(".weather-Name")
let image = document.querySelector("img");
let temperatureName = document.querySelector(".temp-name")
let temperatureNumber = document.querySelector(".temp-num");
let tempDegree = document.querySelector(".temp")
let showCity = document.querySelector(".curCity")
let showTime = document.querySelector(".curTime")


// Add an event listener to listen if the button in our form is clicked on 
form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        // City name is the our user input
        const cityName = form.elements.query.value

        /* const config = { prarams: { q: cityName,  appid: apiKey}}
        This is supposed to store our parameters to add on to the url 
        but I do not know why it isnt working*/

        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f4ba1c5c45874efb70c3f391ae05af62&units=imperial`)
        
        // Name of the temperature gotten from the API which returns a type of weather/temperature
        let temperatureName = res.data.weather[0].main
        displayTempName(temperatureName);
    
        // This generates a src for our weather icon to display it as an image
        let imgSrc = `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`
        displayIcon(imgSrc)
    
        // This displays the degrees in farenheit
        let degree = res.data.main.temp
        displayTempNumber(degree);
        
        // Gets city name
        let city = res.data.name
        displayCity(city);
    
        //This gets the city time zone and calls a function that determines the time and date of our current location
        let cityTimeZone = res.data.timezone
        generateTime(cityTimeZone);
    }
    catch (e) {
        // This catches an error if the user does not eneter a valid city
        alert ("Please enter a valid city")
        form.elements.query.value = "";
    }
  

})

// This is a function that generates a local time based on the timezone provided by the API
function generateTime(timeZone) {
    let d = new Date()
    let localTime = d.getTime()
    let localOffset = d.getTimezoneOffset() * 60000
    let utc = localTime + localOffset
    var cityTime = utc + (1000 * timeZone)
    let newDate= new Date(cityTime)
    showTime.innerText = newDate;
}

// Displays weather icon on webpage
function displayIcon (source) {
    image.src = source;
}

//Displays temeperature name on webpage
function displayTempName (tempName) {
    temperatureName.innerText = tempName;
}

// Displays temeperature number on webpage
function displayTempNumber (tempNum) {
    temperatureNumber.innerText = `${tempNum}\u00B0F`;
}

//Displays city on webpage
function  displayCity (city) {
    showCity.innerText = city
}
