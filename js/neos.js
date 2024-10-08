async function fetchLatestNEOs() {
    const apiKey = "aZfWeGidEyNzH0bV5xWJYON6AAdAinQwUUcqXZYI";
    const today = new Date();
    const startDate = today.toISOString().split("T")[0];
    const endDate = startDate;
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const neos = Object.values(data.near_earth_objects).flat();

        const neoList = document.getElementById("neo-list");
        neoList.innerHTML = neos.map(neo => `
            <div class="neo-item">
                <h3>${neo.name}</h3>
                <p><strong>Diameter:</strong> ${neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
                <p><strong>Miss Distance:</strong> ${parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km</p>
                <p><strong>Potentially Hazardous:</strong> ${neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error("Failed to fetch NEO data", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchLatestNEOs);
