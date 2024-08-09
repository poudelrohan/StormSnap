import { DateTime } from "luxon";

const API_KEY = "210e02f0e9374a7eb5641728232206";
const BASE_URL = "https://api.weatherapi.com/v1";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  console.log(`URL: ${JSON.stringify(url)}`);
  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like },
    name,
    dt,
    sys: { country },
    weather,
  } = data;

  const { main: details, icon } = weather[0];

  return { lat, lon, temp, feels_like, name, dt, country, details, icon };
};

const formatForecastWeather = (data) => {
  let { city, list } = data;
  const timezone = data.city.timezone;

  // Extract daily forecast data
  const daily = list
    .filter((d, index) => index % 8 === 0) // Get data every 24 hours (index divisible by 8)
    .slice(0, 6) // Take the next 5 days
    .map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "ccc"),
        temp: d.main.temp,
        icon: d.weather[0].icon,
      };
    });
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, formattedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = "ccc,dd") =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode };
