//Main div
function divWeatherInfo(json) {
  //Title
  const titleEl = document.querySelector(".weather-title-city");
  titleEl.textContent = json.city.name;

  //Img
  const logoEl = document.querySelector(".logo-weather");
  const cloud = json.list[0].clouds.all;
  if (cloud < 50) {
    logoEl.src = "src/sun1.png";
  } else {
    logoEl.src = "src/cloud1.png";
  }

  //Degrees
  const degreeEl = document.querySelector(".wather-degrees");
  const round = Math.round(json.list[0].main.temp);
  degreeEl.textContent = round + "°C";
}

//Divs
function itemWeather(json, item) {
  const template = document.querySelector(".template-day-after");
  const container = document.querySelector(".content-days-after");

  //Degrees
  const round = Math.round(json[item].main.temp);
  template.content.querySelector(".day-degrees").textContent = round + "°C";

  //Img
  const clouds = json[item].clouds.all;
  if (clouds < 50) {
    template.content.querySelector(".logo-day").src = "src/sun1.png";
  } else {
    template.content.querySelector(".logo-day").src = "src/cloud1.png";
  }

  //Date
  const arrayCortado = json[item].dt_txt.split(" ")[0];
  const resuArray = arrayCortado.split("-").reverse();
  const day = resuArray[0] + "/" + resuArray[1];
  template.content.querySelector(".day-date").textContent = day;

  //Clone
  var clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getDataWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=47ff11f845af4eac28dc328c45867178`
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      divWeatherInfo(json);
      const arrayDays = [6, 15, 23];
      document.querySelector(".content-days-after").innerHTML = "";
      arrayDays.forEach(item => {
        itemWeather(json.list, item);
      });
    });
}

function main() {
  const searchElement = document.querySelector(".search-form");

  searchElement.addEventListener("submit", event => {
    event.preventDefault();
    const citySearch = event.target.search.value;
    getDataWeather(citySearch);
  });
}

main();
