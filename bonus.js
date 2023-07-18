


function buildGauge(wfreq){
    let bucket = parseFloat(wfreq) * 20;

    // Set up gauge design with H.S. trig!!!
    let deg = 180 - bucket;
    // let radius = 1.0;
    let radius = 0.5;
    let rad = (deg * Math.PI)/180;
    let x = radius * Math.cos(rad);
    let y = radius * Math.sin(rad);

    // needle path
    let mainPath = "M -.0 -0.05 L .0 0.05 L ";
    let pathX = String(x);
    let space = " ";
    let pathY = String(y);
    let pathEnd = " Z";
    let path = mainPath.concat(pathX, space, pathY, pathEnd);

    let data = [
        {
            type: "scatter",
            x: [0],
            y: [0],
            marker: {size: 12, color: "850000" },
            showlegend: false,
            name: "Freq",
            text: bucket,
            hoverinfo: "text+name"
        },
        {
            values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
            rotation: 90,
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: [
                    "rgba(0, 105, 11, .5)",
                    "rgba(10, 120, 22, .5)",
                    "rgba(14, 127, 0, .5)",
                    "rgba(110, 154, 22, .5)",
                    "rgba(170, 202, 42, .5)",
                    "rgba(202, 209, 95, .5)",
                    "rgba(210, 206, 145, .5)",
                    "rgba(232, 226, 202, .5)",
                    "rgba(240, 230, 215, .5)",
                    "rgba(255, 255, 255, 0)" 
                ]
            },
            labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            hoverinfo: "label",
            hole: 0.5,
            type: "pie",
            showlegend: false
        }
    ];

    let layout = {
        shapes: [
            {
                type: "path",
                path: path,
                fillcolor:"850000",
                line: {
                    color: "850000"
                }
            }
        ],
        title: "<b> Belly Button Washing Frequency</b> <br> Scrubs per Week",
        height: 500,
        width: 500,
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1,1]
        },
        yaxis: {
            zeroline: false,
            showticklabels: false, 
            showgrid: false,
            range: [-1,1]
        }
    };
    let GAUGE = document.getElementById("gauge");
    Plotly.newPlot(GAUGE, data, layout);
}