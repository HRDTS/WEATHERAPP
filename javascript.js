let temp = document.getElementById('temp');
let status = document.getElementById('status');
let perceivedTemp = document.getElementById('perceivedTemp');
let humidity = document.getElementById('humidity');
let convertButton = document.getElementById('convertButton');
let inputField = document.getElementById('location');
let currentLocation = document.getElementById('currentLocation');
let convert1 = document.getElementById('convert1');
let convert2 = document.getElementById('convert2');
let test = document.getElementById('test');
let loading = document.getElementById('loading');
let locationButton = document.getElementById('locationButton')
let body = document.body



let place = "Athens"
currentLocation.textContent = place

function changeLocation () {
    place = inputField.value
    document.querySelector('form').reset()
}


async function getWeather() {

    try {
        body.style.backgroundImage = 'url("./pexels-johannes-plenio-1118869.jpg")'
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=066f66650930599129ff05ecbc0b55f2`)
        let json = await response.json();
        console.log(json)
        let temperature = Math.round((json.main.temp - 273)*10)/10
        let temperatureFeelsLike = Math.round((json.main.feels_like - 273)*10)/10
        temp.textContent = temperature
        status.textContent = json.weather[0].description
        perceivedTemp.textContent =temperatureFeelsLike
        humidity.textContent = json.main.humidity
        currentLocation.textContent = place

        let icon = json.weather[0].icon
        test.src = `http://openweathermap.org/img/w/${icon}.png`

        function loading() {body.style.backgroundImage = 'none'}
        setTimeout (loading, 100) 
    } catch {
        function loading() {body.style.backgroundImage = 'none'}
        setTimeout (loading, 100) 
        alert('Could not find this location.');
        throw Error('Could not find the weather for this location');
    }

}

getWeather()

let isCelsius = true;

function convertTemperature () {
    if (isCelsius === true) {
        isCelsius = false;
        let currentTemp = temp.textContent;
        temp.textContent = Math.round((currentTemp * 1.8 + 32)*10)/10;
        let currentTempPerceived = perceivedTemp.textContent;
        perceivedTemp.textContent = Math.round((currentTempPerceived * 1.8 + 32)*10)/10; 
        convertButton.textContent = 'convert to celsius';
        convert1.textContent = 'temperature (F°):';
        convert2.textContent = 'perceived temperature (F°):';
    } else {
        isCelsius = true;
        getWeather()
        convertButton.textContent = 'convert to fahrenheit'
        convert1.textContent = 'temperature (C°):' ;
        convert2.textContent = 'perceived temperature (C°):';
    }
}
