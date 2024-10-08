// function to filter asteroids by their close approach date
function filterAsteroidsByCloseApproachDate(asteroids, targetDate) {
    return asteroids.filter(asteroid => {
        return asteroid.close_approach_data.some(ca => ca.close_approach_date === targetDate);
    });
}

// function to fetch asteroid data and pass the filtered data to a callback
async function fetchAsteroidData(callback) {
    const apiKey = "aZfWeGidEyNzH0bV5xWJYON6AAdAinQwUUcqXZYI"; // my api key
    const baseUrl = "https://api.nasa.gov/neo/rest/v1/feed"; // NASA's api

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const startDateStr = yesterday.toISOString().split("T")[0];
    const endDateStr = yesterday.toISOString().split("T")[0];

    const requestUrl = `${baseUrl}?start_date=${startDateStr}&end_date=${endDateStr}&api_key=${apiKey}`;

    try {
        const response = await fetch(requestUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        // filter asteroids by their close approach date
        const filteredData = filterAsteroidsByCloseApproachDate(
            [].concat(...Object.values(data.near_earth_objects)),
            startDateStr
        );

        // pass the filtered data to the callback for vis
        callback(filteredData);
    } catch (error) {
        console.error("Failed to fetch asteroid data:", error);
    }
}
