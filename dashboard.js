// Read in data 

// Create Horizontal bar chart

// Create bubble chart

// Display metadata of individuals demographic info

// Display each key-valus pair from the metatdata JSON object

// Update all plots when new sample is selected

// Data base url
bellyButtonUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function buildMetadata(sample){
    d3.json(bellyButtonUrl).then((data) => {
        let metadata = data.metadata;
        // Display data of selected sample number
        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        // d3 select the panal with id of "#sample-metadata"
        let PANEL = d3.select("#sample-metadata");

        // clear existing metadata
        PANEL.html("");

        // append new tags
        for (key in result){
            PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };
    })
    
}