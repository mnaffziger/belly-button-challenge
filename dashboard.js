// Read in data 

// Create Horizontal bar chart

// Create bubble chart

// Display metadata of individuals demographic info

// Display each key-valus pair from the metatdata JSON object

// Update all plots when new sample is selected

// Data base url
bellyButtonUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// metadata function
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

        // build gauge plot
        buildGauge(result.wfreq);
    });
    
}

// Charts function
function buildCharts(sample) {
    d3.json(bellyButtonUrl).then((data) => {
       let samples = data.samples;
       let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
       let result = resultArray[0]; 

       // define resultArray objects
       let otu_ids = result.otu_ids;
       let otu_labels = result.otu_labels;
       let sample_values = result.sample_values;

       // build bubble chart
       let bubbleLayout = {
        title: "Bacteria Culturers per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID"},
        margin: { t: 30}
       };
       let bubbleData = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }
       ];

       Plotly.newPlot("bubble", bubbleData, bubbleLayout);

       let yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
       let barData = [
        {
            y: yticks,
            x: sample_values.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
       ];

       let barLayout = {
        title: "Top 10 Bacterial Cultures Isolated",
        margin: { t: 30, l: 150 }
       };

       Plotly.newPlot("bar", barData, barLayout);
       });
}

// build the function that starts is up!

function init() {
    // make box to choose an ID to display
    let selector = d3.select("#selDataset");

    // pull from samples to create list
    d3.json(bellyButtonUrl).then((data) => {
        let sampleNames = data.names;

        for (let i = 0; i < sampleNames.length; i++){
            selector
                .append("option")
                .text(sampleNames[i])
                .property("value", sampleNames[i]);
        };

        // Call first sample ID from list to create initial plots
        let firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });

}

// Create function to refresh plots when new sample is selected
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}

// Start it up!!!
init();
