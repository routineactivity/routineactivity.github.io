// URL to your CSV file
const csvUrl = 'https://raw.githubusercontent.com/routineactivity/routineactivity.github.io/master/_datasets/csp_annual.csv';

// Function to fetch and parse the CSV data
async function fetchData() {
    const response = await fetch(csvUrl);
    const csvData = await response.text();
    return Papa.parse(csvData, { header: true }).data;
}

// Function to group and sum data based on selected column and plot the line chart
function plotData(data, groupByColumn) {
    // Group data by 'fy' and the selected column, summing the 'total_off_count'
    const groupedData = data.reduce((acc, row) => {
        const key = row.fy + '-' + row[groupByColumn];
        if (!acc[key]) {
            acc[key] = {
                fy: row.fy,
                group: row[groupByColumn],
                total: 0
            };
        }
        acc[key].total += parseInt(row.total_off_count, 10);
        return acc;
    }, {});

    // Organize data for Plotly
    const xValues = [];
    const yValues = [];

    for (const key in groupedData) {
        const { fy, total } = groupedData[key];
        xValues.push(fy);
        yValues.push(total);
    }

    // Sort data by 'fy' to ensure the x-axis is ordered
    const sortedData = xValues.map((_, i) => ({
        fy: xValues[i],
        total: yValues[i]
    })).sort((a, b) => a.fy - b.fy);

    const sortedXValues = sortedData.map(item => item.fy);
    const sortedYValues = sortedData.map(item => item.total);

    const plotData = [{
        x: sortedXValues,
        y: sortedYValues,
        type: 'scatter',
        mode: 'lines+markers'
    }];

    Plotly.newPlot('chart', plotData, { title: `Total Offenses by Fiscal Year (${groupByColumn})` });
}

// Initialize the chart with default data
async function init() {
    const data = await fetchData();
    const selector = document.getElementById('dataset-selector');

    // Initial plot
    plotData(data, selector.value);

    // Add event listener for dropdown change
    selector.addEventListener('change', function() {
        plotData(data, this.value);
    });
}

// Initialize the chart on page load
init();
