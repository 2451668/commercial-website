document.addEventListener("DOMContentLoaded", () => {
    // NASA NeoWs API
    const apiKey = "aZfWeGidEyNzH0bV5xWJYON6AAdAinQwUUcqXZYI";  // my API key
    const baseUrl = "https://api.nasa.gov/neo/rest/v1/feed";

    //  fetch asteroid data based on closest approach date to Earth
    async function fetchAsteroidData(startDate, endDate) {
        try {
            // construct request URL
            const requestUrl = `${baseUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

            // request
            const response = await fetch(requestUrl);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            // parse response to JSON
            const data = await response.json();

            // will display on console
            console.log("Asteroid Data Response:", data);
        } catch (error) {
            console.error("Failed to fetch asteroid data:", error);
        }
    }

    // calculate start and dates for the previous day
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // formatted as YYYY-MM-DD
    const startDateStr = yesterday.toISOString().split("T")[0];
    const endDateStr = yesterday.toISOString().split("T")[0];

    // fetch data for previous day
    fetchAsteroidData(startDateStr, endDateStr);
});
