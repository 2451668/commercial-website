document.addEventListener("DOMContentLoaded", () => {
    // my API key
    const apiKey = "IhniOYL8T7sCgLe2VA4YpTlQN5DU9srg";
    const baseUrl = "https://api.tomorrow.io/v4/weather/forecast";

    // function to fetch weather data
    async function fetchWeatherData(latitude, longitude) {
        try {
            // full API request URL
            const requestUrl = `${baseUrl}?location=${latitude},${longitude}&apikey=${apiKey}`;

            // making the request
            const response = await fetch(requestUrl);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            // to parse the response to JSON
            const data = await response.json();
            console.log(data);

            displayWeatherData(data);
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    }

    // function to display weather data in the console for demo purposes
    function displayWeatherData(data) {
        console.log("Weather Data for Selected Location:");
        console.log("Temperature:", data?.timelines?.daily[0]?.values?.temperature);
        console.log("Humidity:", data?.timelines?.daily[0]?.values?.humidity);
        console.log("Precipitation:", data?.timelines?.daily[0]?.values?.precipitation);
    }

    // fetch weather data for Johannesburg
    fetchWeatherData(-26.2041, 28.0473);
});
