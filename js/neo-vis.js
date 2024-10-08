// function to create the bar chart for closest asteroids
function createClosestAsteroidsBarChart(filteredAsteroids) {
    const topClosest = filteredAsteroids
        .sort((a, b) => parseFloat(a.close_approach_data[0].miss_distance.kilometers) - parseFloat(b.close_approach_data[0].miss_distance.kilometers))
        .slice(0, 10);

    const margin = { top: 20, right: 30, bottom: 40, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#closest-asteroids-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, d3.max(topClosest, d => parseFloat(d.close_approach_data[0].miss_distance.kilometers))])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(topClosest.map(d => d.name))
        .range([0, height])
        .padding(0.1);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll(".bar")
        .data(topClosest)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d.name))
        .attr("width", d => x(parseFloat(d.close_approach_data[0].miss_distance.kilometers)))
        .attr("height", y.bandwidth())
        .attr("fill", "#0073e6");
}

// function to create the single-line bubble chart for largest asteroids
function createLargestAsteroidsSingleLineBubbleChart(filteredAsteroids) {
    const topLargest = filteredAsteroids
        .sort((a, b) => parseFloat(b.estimated_diameter.kilometers.estimated_diameter_max) - parseFloat(a.estimated_diameter.kilometers.estimated_diameter_max))
        .slice(0, 10);

    const margin = { top: 60, right: 30, bottom: 40, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select("#largest-asteroids-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(topLargest.map(d => d.name))
        .range([0, width])
        .padding(1);

    const radiusScale = d3.scaleSqrt()
        .domain([0, d3.max(topLargest, d => parseFloat(d.estimated_diameter.kilometers.estimated_diameter_max))])
        .range([10, 50]);

    svg.append("g")
        .attr("transform", `translate(0, ${height / 2})`)
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    svg.selectAll(".bubble")
        .data(topLargest)
        .enter()
        .append("circle")
        .attr("class", "bubble")
        .attr("cx", d => x(d.name))
        .attr("cy", height / 2)
        .attr("r", d => radiusScale(parseFloat(d.estimated_diameter.kilometers.estimated_diameter_max)))
        .attr("fill", d => d.is_potentially_hazardous_asteroid ? "#ff4d4d" : "#4da6ff");
}
