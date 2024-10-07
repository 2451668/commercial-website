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

    // function to create a JSON file from the response data; need this to get a better look at the details for each neo. Adapted the method from 'https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link'
    function createJsonFile(data) {
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);

        // temporary link element
        const a = document.createElement("a");
        a.style.display = "none";  // Hide the link
        a.href = url;
        a.download = "asteroid_data_previous_day.json";

        // appends link to body, triggers it, then removes the link
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // release the object URL
        document.body.removeChild(a);
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
