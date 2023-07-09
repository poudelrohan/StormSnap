import React, { useState } from "react";
import {
  Sunny,
  SmallSunny,
  Rainy,
  SmallRainy,
  Cloudy,
  SmallCloudy,
  Snowy,
  SmallSnowy,
  Foggy,
  SmallFoggy,
  Lightning,
  SmallLightning,
  Stormy,
  SmallStormy,
} from "../Icons/Icons";
import Inputt from "./Input";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

function Comp1() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;
  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error) {
        setError("City not found");
        setData({});
      }
    }
  };

  const formatDate = (epoch) => {
    const date = new Date(epoch * 1000); // Convert seconds to milliseconds
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const day = days[date.getDay()];
    const dayOfMonth = date.getDate();

    return `${day} ${dayOfMonth}`;
  };

  const smallformatDate = (epoch) => {
    const date = new Date(epoch * 1000); // Convert seconds to milliseconds
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const day = days[date.getDay()];
    // const dayOfMonth = date.getDate();

    return `${day}`;
  };

  const sun = [1000];
  const rain = [
    1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195,
    1198, 1201, 1204, 1207, 1240, 1243, 1249, 1246, 1252, 1261, 1063,
  ];
  const cloud = [1003, 1006, 1009, 1030];
  const snow = [
    1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258,
    1261, 1264,
  ];
  const fog = [1135, 1147];
  const light = [1273, 1276, 1279, 1282];
  const storm = [1087];

  const codeToSvg = (code) => {
    if (sun.includes(code)) {
      return <Sunny />;
    } else if (rain.includes(code)) {
      return <Rainy />;
    } else if (cloud.includes(code)) {
      return <Cloudy />;
    } else if (snow.includes(code)) {
      return <Snowy />;
    } else if (fog.includes(code)) {
      return <Foggy />;
    } else if (light.includes(code)) {
      return <Lightning />;
    } else if (storm.includes(code)) {
      return <Stormy />;
    } else {
      return code;
    }
  };

  const codeToSmallSvg = (code) => {
    if (sun.includes(code)) {
      return <SmallSunny />;
    } else if (rain.includes(code)) {
      return <SmallRainy />;
    } else if (cloud.includes(code)) {
      return <SmallCloudy />;
    } else if (snow.includes(code)) {
      return <SmallSnowy />;
    } else if (fog.includes(code)) {
      return <SmallFoggy />;
    } else if (light.includes(code)) {
      return <SmallLightning />;
    } else if (storm.includes(code)) {
      return <SmallStormy />;
    } else {
      return code;
    }
  };

  const getClassName = (code) => {
    if (sun.includes(code)) {
      return "sunnygrade";
    } else if (rain.includes(code)) {
      return "cloudygrade";
    } else if (cloud.includes(code)) {
      return "cloudygrade";
    } else if (snow.includes(code)) {
      return "cloudygrade";
    } else if (fog.includes(code)) {
      return "foggygrade";
    } else if (light.includes(code)) {
      return "foggygrade";
    } else if (storm.includes(code)) {
      return "foggygrade";
    } else {
      return "sunnygrade";
    }
  };

  let currentWeatherCode = data?.current?.condition?.code ?? null;
  let oneWeatherCode =
    data?.forecast?.forecastday[1]?.day?.condition?.code ?? null;
  let twoWeatherCode =
    data?.forecast?.forecastday[2]?.day?.condition?.code ?? null;
  let threeWeatherCode =
    data?.forecast?.forecastday[3]?.day?.condition?.code ?? null;
  let fourWeatherCode =
    data?.forecast?.forecastday[4]?.day?.condition?.code ?? null;
  let fiveWeatherCode =
    data?.forecast?.forecastday[5]?.day?.condition?.code ?? null;
  let sixWeatherCode =
    data?.forecast?.forecastday[6]?.day?.condition?.code ?? null;

  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <div id="welcome">
        <h2> Weather App</h2>
        <p>Search any City in the box above</p>
        <h5 style={{ position: "fixed", bottom: 0, right: 0, color: "black" }}>
          Made By Rohan
        </h5>
      </div>
    );
  } else if (error !== "") {
    content = (
      <div id="errormessage">
        <h2>City Not Found</h2>

        <p> Enter a Valid City Name</p>
      </div>
    );
  } else {
    content = <div></div>;
  }

  return (
    <div className={getClassName(currentWeatherCode)}>
      <div id="mainbox">
        <Inputt handleSearch={handleSearch} setLocation={setLocation} />
        {content}
        <div className="upperbox">
          <div id="dateplacebox">
            <div id="date">
              <h3>
                {data.location ? (
                  <div>{formatDate(data.location.localtime_epoch)}</div>
                ) : null}
              </h3>
            </div>
            <div id="place">
              <h6>
                {data.location ? (
                  <div>Today in {data.location.name}</div>
                ) : null}
              </h6>
            </div>
          </div>
          <div id="iconbox" className="upperbox">
            <div className="suns">
              {codeToSvg(currentWeatherCode)}
              {/* <Sunny /> */}
            </div>
            <div id="weathertext">
              <h6>
                {data.current ? <div>{data.current.condition.text}</div> : null}
              </h6>
            </div>
          </div>
          <div id="degreebox" className="upperbox">
            <div id="realdegree">
              <h2>
                {data.current ? (
                  <div>{Math.ceil(data.current.temp_c)}°</div>
                ) : null}
              </h2>
            </div>
            <div id="feeldegree">
              <h6>
                {data.current ? (
                  <div>Feels like {Math.ceil(data.current.feelslike_c)}°</div>
                ) : null}
              </h6>
            </div>
          </div>
        </div>
        <div className="lowerbox">
          <div id="whitecard">
            <div id="cardtopic">
              <h4>Next 7 days ...</h4>
            </div>
            <div className="sevenicons">
              <div className="oneicon">
                <div>
                  {data.forecast ? (
                    <div>
                      {smallformatDate(data.forecast.forecastday[0].date_epoch)}
                    </div>
                  ) : null}
                </div>
                <div className="noo">{codeToSmallSvg(currentWeatherCode)}</div>
                <div>
                  {data.forecast ? (
                    <div>
                      {Math.ceil(data.forecast.forecastday[0].day.maxtemp_c)}°/
                      {Math.ceil(data.forecast.forecastday[0].day.mintemp_c)}°
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="oneicon">
                <div>
                  {data.forecast ? (
                    <div>
                      {smallformatDate(data.forecast.forecastday[1].date_epoch)}
                    </div>
                  ) : null}
                </div>
                <div>{codeToSmallSvg(oneWeatherCode)}</div>
                <div>
                  {data.forecast ? (
                    <div>
                      {Math.ceil(data.forecast.forecastday[1].day.maxtemp_c)}°/
                      {Math.ceil(data.forecast.forecastday[1].day.mintemp_c)}°
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="oneicon">
                <div>
                  {data.forecast ? (
                    <div>
                      {smallformatDate(data.forecast.forecastday[2].date_epoch)}
                    </div>
                  ) : null}
                </div>
                <div className="noo">{codeToSmallSvg(twoWeatherCode)}</div>
                <div>
                  {data.forecast ? (
                    <div>
                      {Math.ceil(data.forecast.forecastday[2].day.maxtemp_c)}°/
                      {Math.ceil(data.forecast.forecastday[2].day.mintemp_c)}°
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="oneicon">
                <div>
                  {data.forecast ? (
                    <div>
                      {smallformatDate(data.forecast.forecastday[3].date_epoch)}
                    </div>
                  ) : null}
                </div>
                <div className="noo">{codeToSmallSvg(threeWeatherCode)}</div>
                <div>
                  {data.forecast ? (
                    <div>
                      {Math.ceil(data.forecast.forecastday[3].day.maxtemp_c)}°/
                      {Math.ceil(data.forecast.forecastday[3].day.mintemp_c)}°
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="oneicon">
                <div>
                  {data.forecast ? (
                    <div>
                      {smallformatDate(data.forecast.forecastday[4].date_epoch)}
                    </div>
                  ) : null}
                </div>
                <div className="noo">{codeToSmallSvg(fourWeatherCode)}</div>
                <div>
                  {data.forecast ? (
                    <div>
                      {Math.ceil(data.forecast.forecastday[4].day.maxtemp_c)}°/
                      {Math.ceil(data.forecast.forecastday[4].day.mintemp_c)}°
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="oneicon">
                <div>
                  {data.forecast ? (
                    <div>
                      {smallformatDate(data.forecast.forecastday[5].date_epoch)}
                    </div>
                  ) : null}
                </div>
                <div className="noo">{codeToSmallSvg(fiveWeatherCode)}</div>
                <div>
                  {data.forecast ? (
                    <div>
                      {Math.ceil(data.forecast.forecastday[5].day.maxtemp_c)}°/
                      {Math.ceil(data.forecast.forecastday[5].day.mintemp_c)}°
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="oneicon">
                <div>
                  {data.forecast ? (
                    <div>
                      {smallformatDate(data.forecast.forecastday[6].date_epoch)}
                    </div>
                  ) : null}
                </div>
                <div id="lastbox">{codeToSmallSvg(sixWeatherCode)}</div>
                <div>
                  {data.forecast ? (
                    <div>
                      {Math.ceil(data.forecast.forecastday[6].day.maxtemp_c)}°/
                      {Math.ceil(data.forecast.forecastday[6].day.mintemp_c)}°
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comp1;
