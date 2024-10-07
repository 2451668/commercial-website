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
            console.log("Full Weather Data Response:", data); // Log entire response for debugging

            // prepare the data for visualisation
            prepareDataForVisualisations(data);
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    }

    // function to prepare data for vis
    function prepareDataForVisualisations(data) {
        if (data?.timelines?.daily) {
            const dailyData = data.timelines.daily;

            // temp and humidity data
            const temperatureData = dailyData.map(day => ({
                date: day.startTime,
                temperature: day.values.temperatureAvg
            }));

            const humidityData = dailyData.map(day => ({
                date: day.startTime,
                humidity: day.values.humidityAvg
            }));

            // calls functions to create simple vis
            createTemperatureLineChart(temperatureData);
            createHumidityBarChart(humidityData);
        } else {
            console.error("No daily data available for visualisation");
        }
    }

    // function to display weather data in the console for demo purposes
    function displayWeatherData(data) {
        console.log("Weather Data for Selected Location:");
        console.log("Temperature:", data?.timelines?.daily[0]?.values?.temperatureAvg); 
        console.log("Humidity:", data?.timelines?.daily[0]?.values?.humidityAvg); 
        console.log("Precipitation Probability:", data?.timelines?.daily[0]?.values?.precipitationProbability); 
    }

    // fetch weather data for Johannesburg
    fetchWeatherData(-26.2041, 28.0473);
});
