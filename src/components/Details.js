import React from "react";
import { useSelector } from "react-redux";

export default function Details() {
  const { results } = useSelector((state) => state.results);

  return (
    <>
      <div>
        <h1 class="text-6xl text-center text-gray-800 capitalize font-bold mt-10 mb-8">
          {results.name}, {results.sys.country}
        </h1>
      </div>
      <div class="flex flex-wrap justify-center grid-cols-1 sm:grid-cols-2 gap-0 ">
        <div class="flex flex-col w-full m-6 h-42 shadow-lg rounded-lg card overflow-hidden sm:w-52">
          <div class="w-4/4 my-2 h-40">
            <h2 class="text-lg text-center text-gray-900 capitalize font-bold mb-6">
              {results.weather[0].description}
            </h2>
            <img
              alt=""
              class="h-20 w-20 mx-auto "
              src="https://cdn-icons-png.flaticon.com/512/121/121105.png"
            />
          </div>
        </div>
        <div class="flex flex-col w-full m-6 h-42 card shadow-lg rounded-lg overflow-hidden sm:w-52">
          <div class="w-4/4 my-2 h-40">
            <h2 class="text-lg text-center text-gray-900 capitalize font-bold">
              Temperature
            </h2>
            <h2 class="text-lg text-center text-gray-800 capitalize font-bold mb-4">
              {results.main.temp}°C
            </h2>
            <img
              alt=""
              class="h-20 w-20 mx-auto"
              src="https://cdn-icons-png.flaticon.com/512/615/615576.png"
            />
          </div>
        </div>
        <div class="flex flex-col w-full m-6 h-42  card shadow-lg rounded-lg overflow-hidden sm:w-52">
          <div class="w-4/4 my-2 h-40 flex-wrap  flex items-center md:grid grid-cols-2 gap-1 justify-center">
            <div>
              <h2 class="text-base text-center text-gray-900 capitalize font-bold mb-2 pb-4 pl-1">
                Humidity:
                <br />
                {results.main.humidity}%
              </h2>
              <img
                alt=""
                class="h-12 w-12 mx-auto"
                src="https://cdn-icons-png.flaticon.com/512/727/727891.png"
              />
            </div>
            <div>
              <h2 class="text-base text-center text-gray-900 capitalize font-bold mb-2 pb-4 pl-1">
                Pressure:
                <br />
                {results.main.pressure} Pa
              </h2>
              <img
                alt=""
                class="h-12 w-12 mx-auto"
                src="https://cdn-icons.flaticon.com/png/512/1818/premium/1818069.png?token=exp=1637658477~hmac=62eaaeb38eb15ca9477543880fc0979b"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full m-6 h-42  card shadow-lg rounded-lg overflow-hidden sm:w-52">
          <div class="w-4/4 my-2 h-40">
            <h2 class="text-lg text-center text-gray-900 font-bold">Wind</h2>
            <h2 class="text-lg text-center text-gray-800 font-bold mb-2">
              {results.wind.speed} m/s
            </h2>
            <img
              alt=""
              class="h-20 w-20 mx-auto"
              src="https://cdn-icons-png.flaticon.com/512/483/483575.png"
            />
          </div>
        </div>
      </div>
    </>
  );
}
