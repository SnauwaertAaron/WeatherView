// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

function cityFormat(CityInput){
    CityInput.toLowerCase();
    CityInput = CityInput.charAt(0).toUpperCase() + CityInput.slice(1);
    return CityInput
}

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
    try
    {
        htmlTemperature.innerText = `${Math.round(queryResponse.main.temp)}°C`;
    htmlWindChill.innerText = `${Math.round(queryResponse.main.feels_like)}°C`;
    htmlHumidity.innerText = `${queryResponse.main.humidity}%`;
    htmlWindSpeed.innerText = `${queryResponse.wind.speed} km/h`;
    let rotateAngle = `${queryResponse.wind.deg}`;
    console.log(rotateAngle);

    htmlArrow.setAttribute("transform", `rotate(${rotateAngle})`);


    kwik(queryResponse.main.temp);
    }
    catch
    {
        htmlError.innerText= `Could not find a city named "${cityFormat(document.getElementById('CityText').value)}". Please try again in the regional language.`;
    }
    
};


// API opvragen aan de hand van de ingegeven stad
const getAPI = async (cityname) => {
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
        htmlError.innerText = "Enter a city";
        let CityInput = document.getElementById('CityText').value

        if(CityInput == null || CityInput == ""){
            htmlError.innerText = "Please enter a city!";
        }
        else{
                getAPI(cityFormat(CityInput));
        }
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

    htmlError= document.querySelector('.js-Error');

    htmlArrow = document.querySelector('.js-WindDirection');

    console.log("DOMContentLoaded");

    listenToThemeToggle();
    listenToSearchOnCity();
});