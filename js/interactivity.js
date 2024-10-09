function addInteractivity() {
    const tooltip = d3.select("body").append("div").attr("class", "tooltip");

    d3.selectAll(".bar, .bubble")
        .on("mouseover", function(event, d) {
            tooltip.transition().duration(200).style("opacity", 1);
            tooltip.html(`
                <strong>${d.name}</strong><br/>
                Miss Distance: ${parseFloat(d.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km<br/>
                Velocity: ${parseFloat(d.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString()} km/h<br/>
                Hazardous: ${d.is_potentially_hazardous_asteroid ? "Yes" : "No"}
            `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition().duration(300).style("opacity", 0);
        })
        .on("click", function(event, d) {
            d3.select("#asteroid-details").html(`
                <h2>${d.name}</h2>
                <p><strong>Miss Distance:</strong> ${parseFloat(d.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km</p>
                <p><strong>Estimated Diameter:</strong> ${d.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - ${d.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
                <p><strong>Potentially Hazardous:</strong> ${d.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
                <a href="${d.nasa_jpl_url}" target="_blank">View on NASA JPL Website</a>
            `);

            d3.select("#asteroid-modal").style("display", "block");
        });

    d3.select("#close-modal").on("click", function() {
        d3.select("#asteroid-modal").style("display", "none");
    });
}
