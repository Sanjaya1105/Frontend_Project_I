import { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

  const fetchWeather = async () => {
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Weather App</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-lg text-black"
        />
        <button
          onClick={fetchWeather}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-200"
        >
          Get Weather
        </button>
      </div>

      {weather && (
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-semibold">{weather.name}</h2>
          <p className="text-xl">{weather.main.temp}°C</p>
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
