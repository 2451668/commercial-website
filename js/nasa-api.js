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

    // call to fetch for the past week; can't get more due to volume of results and rate limit concerns
    const startDate = "2024-10-01";
    const endDate = "2024-10-07";
    fetchAsteroidData(startDate, endDate);
});
