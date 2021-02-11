const weatherSpan  = document.querySelector(".weather"),
  weatherIcon = document.querySelector(".weatherIcon");

const API_KEY = "b62020883b35c55f405ea3737ccc87bc";

const COORDS = "coords";

const getWeather = (lat, lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(res => res.json())
  .then(data => {
    const temp =  data.main.temp;
    const place = data.name;
    const weathers = data.weather[data.weather.length - 1];
    weatherIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
    weatherSpan.innerHTML = `${place} / ${temp} °C / ${weathers.main}`;
  })
}

const handleGeoSuc = (postion) => {
  const lat = postion.coords.latitude;
  const lon = postion.coords.longitude;
  const coordsObj = {
    lat: "latitude",
    lon: "longitude"
  };
  getWeather(lat, lon);
  saveCoords(coordsObj);
}

const saveCoords = (coordsObj) => {

  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

const handleGeoErr = (err) => {
  alert('위치를 불러 오는데 실패 했습니다.');
  document.write(`<h2>Geolocation Error! ${err} </h2>`);
}

const requestCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuc, handleGeoErr);
}

const goinit = () => {
  requestCoords();
}

goinit();