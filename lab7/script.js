const APPID = 'e1ef62801351760f525e8d89347c6d04';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast';
const cityURL = 'https://api.api-ninjas.com/v1/city';

let selectedCity = null;
let cities = JSON.parse(localStorage.getItem('cities')) || [];

document.addEventListener('DOMContentLoaded', function() {
    updateWeather();
    setInterval(updateWeather, 300000); // Aktualizacja co 5 minut
    cities.forEach(city => addCityElement(city));
});

function suggestCity() {
    let input = document.getElementById('cityInput').value;
    if (input.length < 3) return; // min długość wprowadzonego tekstu
    fetch(`${cityURL}?name=${input}`, {headers: {'X-Api-Key': 'hfEfgczqEaj6umMvaWGHPg==xeqfyHYrpWkE5y9v'}})
        .then(response => response.json())
        .then(data => {
            let suggestions = document.getElementById('suggestions');
            suggestions.innerHTML = '';
            if (Array.isArray(data)) { // sprawdzenie czy odpowiedź jest tablicą
                data.forEach(city => {
                    let div = document.createElement('div');
                    div.textContent = city.name;
                    div.onclick = function() {
                        document.getElementById('cityInput').value = city.name;
                        suggestions.innerHTML = '';
                    };
                    suggestions.appendChild(div);
                });
            } 
        })
        .catch(error => console.error('Błąd podczas próby pobrania danych miasta:', error));
}

document.querySelector('.btn').addEventListener('click', addCity);

function addCity() {
    let cityName = document.getElementById('cityInput').value;
    if (!cities.includes(cityName) && cities.length < 10) {
        cities.push(cityName);
        localStorage.setItem('cities', JSON.stringify(cities));
        updateWeather();
    }
}


function addCityElement(cityName, container) {
    const existingCityDiv = document.querySelector(`.city-weather[data-city-name="${cityName}"]`);
    if (!existingCityDiv) {
        let div = document.createElement('div');
        div.className = 'city';
        div.setAttribute('data-city-name', cityName);

        let removeBtn = document.createElement('button');
        removeBtn.textContent = "X";
        removeBtn.onclick = function() {
            cities = cities.filter(city => city !== cityName);
            localStorage.setItem('cities', JSON.stringify(cities));
            div.remove();
            updateWeather();
        };
        div.appendChild(removeBtn);
        container.appendChild(div);
    } 
}



function updateWeather() {
    const container = document.getElementById('citiesContainer');
    container.innerHTML = '';
    cities.forEach(city => {
        fetch(`${weatherURL}?q=${city}&APPID=${APPID}&units=metric`)
            .then(response => response.json())
            .then(data => {
                displayWeather(data, city);
            })
            .catch(error => console.error('Błąd podczas pobierania danych:', error));
    });
}

function displayWeather(data, city) {
    const container = document.getElementById('citiesContainer');
    const cityDiv = document.createElement('div');
    cityDiv.className = 'city-weather';
    cityDiv.setAttribute('data-city-name', city);
    cityDiv.innerHTML = `
        <h2 class='miasto'>${city} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}"> </h2>
        <p>Temperatura: ${data.main.temp} °C (odczuwalna: ${data.main.feels_like} °C)</p>
        <p>Wilgotność: ${data.main.humidity}%</p>
        <p>Ciśnienie: ${data.main.pressure} hPa</p>
        <p>Wiatr: ${data.wind.speed} m/s, kierunek: ${data.wind.deg}°</p>
    `;
    addCityElement(city, cityDiv); 
    container.appendChild(cityDiv);
}
