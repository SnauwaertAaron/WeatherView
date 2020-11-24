// Opgehaalde waarden weergeven op pagina
const showResult = (queryResponse) => {
    console.log(queryResponse);

    htmlTemperature.innerText = `${Math.round(queryResponse.main.temp)}°C`;
    htmlWindChill.innerText = `${Math.round(queryResponse.main.feels_like)}°C`;
    htmlHumidity.innerText = `${queryResponse.main.humidity}%`;
    htmlWindSpeed.innerText = `${queryResponse.wind.speed} km/h`;
    let rotateAngle = `${queryResponse.wind.deg}`;
    console.log(rotateAngle);

    arrow.setAttribute("transform", `rotate(${rotateAngle})`);

};


// API opvragen aan de hand van de ingegeven stad
const getAPI = async (cityname) => {
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=0d83dff417d181fcf3def092e000cdf6&units=metric&lang=nl&cnt=1`;

    const data = await fetch(endpoint)
        .then((r) => r.json())
        .catch((err) => console.error('An error occured', err));
    showResult(data);
};


// Listener toevoegen aan de button
const listenToSearchOnCity = function(){
    const button = document.querySelector('.js-Cityinput');
    button.addEventListener('click', function(){
        getAPI(document.getElementById('CityText').value);
    });
  };




// DOMContentloaded aanmaken
document.addEventListener('DOMContentLoaded', function () {
    htmlBody = document.querySelector('body');
    htmlTemperature = document.querySelector('.js-Temperature');
    htmlWindChill = document.querySelector('.js-WindChill');
    htmlHumidity = document.querySelector('.js-Humidity');
    htmlWindSpeed = document.querySelector('.js-WindSpeed');
    arrow = document.querySelector('.js-WindDirection');


    listenToSearchOnCity();
});