const form = document.querySelector("#weatherForm");
const button = document.querySelector("button");
let weatherName = document.querySelector(".weather-Name")
let image = document.querySelector("img");
let display = document.querySelector(".display")

const apiKey = `f4ba1c5c45874efb70c3f391ae05af62`;

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const cityName = form.elements.query.value
    // const config = { prarams: { q: cityName,  appid: apiKey}}
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f4ba1c5c45874efb70c3f391ae05af62
    `)

   weatherName.innerText = res.data.weather[0].main
   image.src =  `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`
   
   

})