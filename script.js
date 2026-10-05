async function getWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "Please enter a city.";
        return;
    }

    try {
        const geo = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const location = await geo.json();

        if (!location.results) {
            result.innerHTML = "City not found.";
            return;
        }

        const lat = location.results[0].latitude;
        const lon = location.results[0].longitude;
        const name = location.results[0].name;

        const weather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const data = await weather.json();

        result.innerHTML = `
            <h2>${name}</h2>
            <p>🌡️ Temperature: ${data.current.temperature_2m} °C</p>
            <p>💧 Humidity: ${data.current.relative_humidity_2m}%</p>
            <p>💨 Wind Speed: ${data.current.wind_speed_10m} km/h</p>
        `;

    } catch (error) {
        result.innerHTML = "Error fetching weather data.";
    }
}