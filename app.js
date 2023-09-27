const apiKey = "573589387ae4100f6663d8def0c1e73b";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const Celsiousbtn = document.getElementById("Celsius");
const Fahrenheitbtn = document.getElementById("Fahrenheit");
const result = document.getElementById("temparature");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    const temp = (document.querySelector(".temp").innerHTML = Math.round(
      data.main.temp
    ));
    document.querySelector(".temp").style.display = "none";

    Celsiousbtn.addEventListener("click", () => {
      Celsiousbtn.classList.add("active");
      Fahrenheitbtn.classList.remove("active");

      const temparature = temp;
      result.textContent = temparature + "°C";
      document.querySelector(".temp").style.display = "block";
    });

    Fahrenheitbtn.addEventListener("click", () => {
      Fahrenheitbtn.classList.add("active");
      Celsiousbtn.classList.remove("active");

      const temparature = (temp * 9) / 5 + 32;
      result.textContent = temparature + "°F";
    });

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".description").innerHTML =
      data.weather[0].description;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
