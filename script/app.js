const showResult = (queryResponse) => {
    console.log(queryResponse);

    htmlTemperature.innerText = `${queryResponse.main.temp}°C`;
    htmlWindChill.innerText = `${queryResponse.main.feels_like}°C`;
    htmlHumidity.innerText = `${queryResponse.main.humidity}%`;
    htmlWindSpeed.innerText = `${queryResponse.wind.speed} km/h`;
    htmlWinDirection.innerText = `${queryResponse.wind.deg}°`;
};


const getAPI = async (cityname) => {
    // Eerst bouwen we onze url op
    // Met de fetch API proberen we de data op te halen.
    // Als dat gelukt is, gaan we naar onze showResult functie.
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=0d83dff417d181fcf3def092e000cdf6&units=metric&lang=nl&cnt=1`;

    const data = await fetch(endpoint)
        .then((r) => r.json())
        .catch((err) => console.error('An error occured', err));
    showResult(data);
};




const listenToSearchOnCity = function(){
    let afgeschaftwaarde
    const button = document.querySelector('.js-Cityinput');
    button.addEventListener('click', function(){

        getAPI(document.getElementById('CityText').value);
    });
  };




document.addEventListener('DOMContentLoaded', function () {
    htmlBody = document.querySelector('body');
    htmlTemperature = document.querySelector('.js-Temperature');
    htmlWindChill = document.querySelector('.js-WindChill');
    htmlHumidity = document.querySelector('.js-Humidity');
    htmlWindSpeed = document.querySelector('.js-WindSpeed');
    htmlWinDirection = document.querySelector('.js-WindDirection');

    listenToSearchOnCity();
});