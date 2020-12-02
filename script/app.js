const kwik = (temp) => {
    let abstemp = Math.abs(temp);
    let y = 108;
    if (temp > 0) {
        y = y-(abstemp*2.2);
    }
    else{
        y = y+(abstemp*2.2);
    }

    document.getElementById("js-Polygon").setAttribute("points", `30,${y} 70,${y} 70,250 30,250`);
};


// Opgehaalde waarden weergeven op pagina
const showResult = (queryResponse) => {
    console.log(queryResponse);

    htmlTemperature.innerText = `${Math.round(queryResponse.main.temp)}°C`;
    htmlWindChill.innerText = `${Math.round(queryResponse.main.feels_like)}°C`;
    htmlHumidity.innerText = `${queryResponse.main.humidity}%`;
    htmlWindSpeed.innerText = `${queryResponse.wind.speed} km/h`;
    let rotateAngle = `${queryResponse.wind.deg}`;
    console.log(rotateAngle);

    htmlArrow.setAttribute("transform", `rotate(${rotateAngle})`);


    kwik(queryResponse.main.temp);
};


// API opvragen aan de hand van de ingegeven stad
const getAPI = async (cityname) => {
    console.log("GetAPI");
    console.log("Test test");
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=0d83dff417d181fcf3def092e000cdf6&units=metric&lang=nl&cnt=1`;

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
        console.log("Click");
    });
  };

//Listen to theme toggle
const listenToThemeToggle = function(){
    let theme =0;
    const toggle = document.getElementById('toggle');
    toggle.addEventListener('change', function(){
        document.body.classList.toggle('dark');

        if (theme%2 != 0){ //oneven
            document.getElementById("js-Logo").src = "./img/Lighttheme_logo.png";
            document.getElementById("js-Thermometer").src = "./img/Lighttheme_Thermometer.png";   
        }
	    else{ //even
            document.getElementById("js-Logo").src = "./img/Darktheme_logo.png";
            document.getElementById("js-Thermometer").src = "./img/Darktheme_Thermometer.png";
        }
       
        theme = theme+1;
    });
  };



// DOMContentloaded aanmaken
document.addEventListener('DOMContentLoaded', function () {
    htmlBody = document.querySelector('body');
    htmlTemperature = document.querySelector('.js-Temperature');
    htmlWindChill = document.querySelector('.js-WindChill');
    htmlHumidity = document.querySelector('.js-Humidity');
    htmlWindSpeed = document.querySelector('.js-WindSpeed');

    htmlArrow = document.querySelector('.js-WindDirection');

    console.log("DOMContentLoaded");

    listenToThemeToggle();
    listenToSearchOnCity();
});