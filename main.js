const api = {
    key: "95dbf8637213596a65605324d54153a0",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);



function setQuery(evt) {
    if (evt.keyCode == 13) {  
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);       
        
        
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

    /*let temperatureDegree = document.querySelector(".current");
    let temperatureSpan = document.querySelector(".current span");  

    
    
       let celsius = document.getElementById('temp');
       let celsiusValue = (temp * 9) / 5 + 32; 
    
    temperatureDegree.addEventListener("click", () => {
          
        if(temperatureSpan.textContent === "°c") {
            celsiusValue.textContent = celsius;
            temperatureSpan.textContent = "°f";   
        } else {
            temperatureSpan.textContent = "°c";
            
        }
    });*/

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°f / ${Math.round(weather.main.temp_max)}°f`;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novermber", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

