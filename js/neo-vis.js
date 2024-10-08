// function to create the bar chart for closest asteroids
function createClosestAsteroidsBarChart(filteredAsteroids) {
    // sort the asteroids by miss distance
    const closestAsteroids = filteredAsteroids
        .sort((a, b) => parseFloat(a.close_approach_data[0].miss_distance.kilometers) - parseFloat(b.close_approach_data[0].miss_distance.kilometers));

    const margin = { top: 20, right: 30, bottom: 40, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    //  svg container for the bar chart
    const svg = d3.select("#closest-asteroids-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // x and y scales for the chart
    const x = d3.scaleLinear()
        .domain([0, d3.max(closestAsteroids, d => parseFloat(d.close_approach_data[0].miss_distance.kilometers))])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(closestAsteroids.map(d => d.name))
        .range([0, height])
        .padding(0.1);

    // append x and y axes to svg
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    // create and append bars for each asteroid
    svg.selectAll(".bar")
        .data(closestAsteroids)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d.name))
        .attr("width", d => x(parseFloat(d.close_approach_data[0].miss_distance.kilometers)))
        .attr("height", y.bandwidth())
        .attr("fill", "#0073e6");
}

// function to create the bubble chart using a pack layout
function createLargestAsteroidsBubbleChart(filteredAsteroids) {
    // format the data for use in the bubble pack layout
    const data = {
        children: filteredAsteroids.map(d => ({
            name: d.name,
            value: parseFloat(d.estimated_diameter.kilometers.estimated_diameter_max),
            hazardous: d.is_potentially_hazardous_asteroid
        }))
    };

    const width = 800;
    const height = 800;
    const colourScale = d3.scaleOrdinal()
        .domain([true, false])
        .range(["#ff4d4d", "#4da6ff"]); // red for hazardous, blue for non-hazardous

    // create a bubble pack layout
    const pack = d3.pack()
        .size([width, height])
        .padding(3);

    const root = d3.hierarchy(data)
        .sum(d => d.value);

    const nodes = pack(root).leaves();

    // select the svg container
    const svg = d3.select("#largest-asteroids-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("class", "bubble-chart");

    // create and append the bubbles
    const bubble = svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .attr("fill", d => colourScale(d.data.hazardous))
        .attr("stroke", "#999")
        .attr("stroke-width", 1);

    // append text labels inside the bubbles
    svg.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dy", "0.3em")
        .attr("text-anchor", "middle")
        .text(d => d.data.name)
        .style("font-size", d => `${Math.min(d.r / 3, 12)}px`)
        .style("fill", "#fff");

    // add legend
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 120}, 20)`);

    legend.append("rect").attr("x", 0).attr("y", 0).attr("width", 15).attr("height", 15).attr("fill", "#ff4d4d");
    legend.append("text").attr("x", 20).attr("y", 12).text("Potentially Hazardous");

    legend.append("rect").attr("x", 0).attr("y", 20).attr("width", 15).attr("height", 15).attr("fill", "#4da6ff");
    legend.append("text").attr("x", 20).attr("y", 32).text("Not Hazardous");
}

