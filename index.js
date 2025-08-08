/* scripts.js */
const API_URL =
  "http://api.weatherapi.com/v1/current.json?key=c9240f5c2f5e4e9c867143254251406&aqi=yes&q=";

const searchForm = document.getElementById("searchForm");
const cityInput  = document.getElementById("cityInput");

const resultBox  = document.getElementById("result");
const errBox     = document.getElementById("error");

const locationEl = document.getElementById("location");
const dateEl     = document.getElementById("date");
const iconEl     = document.getElementById("icon");
const tempEl     = document.getElementById("temp");
const conditionEl= document.getElementById("condition");
const feelsEl    = document.getElementById("feels");
const humidityEl = document.getElementById("humidity");
const windEl     = document.getElementById("wind");
const uvEl       = document.getElementById("uv");

/* ---------- Helpers ---------- */
function showError(msg) {
  errBox.textContent = msg;
  resultBox.classList.add("hidden");
}

function clearError() {
  errBox.textContent = "";
}

/* ---------- Rendering ---------- */
function renderWeather(data) {
  clearError();
  const { location, current } = data;

  locationEl.textContent = `${location.name}, ${location.country}`;
  dateEl.textContent = new Date(location.localtime).toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  iconEl.src = `https:${current.condition.icon}`;
  iconEl.alt = current.condition.text;

  tempEl.textContent = current.temp_c.toFixed(1);
  conditionEl.textContent = current.condition.text;

  feelsEl.textContent = current.feelslike_c.toFixed(1);
  humidityEl.textContent = current.humidity;
  windEl.textContent = current.wind_kph.toFixed(0);
  uvEl.textContent   = current.uv;

  resultBox.classList.remove("hidden");
}

/* ---------- Fetch ---------- */
async function fetchWeather(query) {
  try {
    const res = await fetch(API_URL + encodeURIComponent(query));
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

/* ---------- Events ---------- */
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
  cityInput.blur();
});
