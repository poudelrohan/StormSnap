import React, { useEffect, useState } from "react";
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
import getFormattedWeatherData from "../Services/weatherService";

function Comp1() {
  // const [query, setQuery] = useState({ q: "pokhara" });
  // const [units, setUnits] = useState("metric");
  // const [weather, setWeather] = useState(null);

  // useEffect(() => {
  //   const fetchWeather = async () => {
  //     await getFormattedWeatherData({ ...query, units }).then((data) => {
  //       setWeather(data);
  //     });
  //   };
  //   fetchWeather();
  // }, [query, units]);

  return (
    <div id="mainbox">
      <div class="search-container">
        <form action="">
          <input type="text" placeholder="Search..." name="search" />
        </form>
      </div>
      <div className="upperbox">
        <div id="dateplacebox">
          <div id="date">
            <h3>SUN 24</h3>
          </div>
          <div id="place">
            <h6>Today in Pokhara</h6>
          </div>
        </div>
        <div id="iconbox" className="upperbox">
          <div className="suns">
            <Sunny />
          </div>
          <div id="weathertext">
            <h6> Moderate Sun</h6>
          </div>
        </div>
        <div id="degreebox" className="upperbox">
          <div id="realdegree">
            <h2>22°</h2>
          </div>
          <div id="feeldegree">
            <h6>Feels like 28°</h6>
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
              <div>MON</div>
              <div className="noo">
                <SmallSunny />
              </div>
              <div>19°</div>
            </div>
            <div className="oneicon">
              <div>TUE</div>
              <div>
                <SmallRainy />
              </div>
              <div>19°</div>
            </div>
            <div className="oneicon">
              <div>WED</div>
              <div className="noo">
                <SmallSnowy />
              </div>
              <div>19°</div>
            </div>
            <div className="oneicon">
              <div>THU</div>
              <div className="noo">
                <SmallStormy />
              </div>
              <div>19°</div>
            </div>

            <div className="oneicon">
              <div>FRI</div>
              <div className="noo">
                <SmallCloudy />
              </div>
              <div>19°</div>
            </div>
            <div className="oneicon">
              <div>SAT</div>
              <div className="noo">
                <SmallFoggy />
              </div>
              <div>19°</div>
            </div>
            <div className="oneicon">
              <div>SUN</div>
              <div id="lastbox">
                <SmallLightning />
              </div>
              <div>19°</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comp1;
