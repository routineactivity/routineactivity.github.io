// URL to your CSV file
const csvUrl = 'https://raw.githubusercontent.com/routineactivity/routineactivity.github.io/master/_datasets/csp_annual.csv';

// Function to fetch and parse the CSV data
async function fetchData() {
    try {
        const response = await fetch(csvUrl);
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;
        console.log("Fetched and parsed data:", parsedData); // Debugging
        return parsedData;
    } catch (error) {
        console.error("Error fetching the data:", error);
    }
}

// Function to populate dropdowns with unique values from the data
function populateDropdowns(data) {
    const forceSet = new Set();
    const csp23nmSet = new Set();
    const offSubSet = new Set();
    const offDescSet = new Set();

    data.forEach(row => {
        if (row.force) forceSet.add(row.force);
        if (row.csp23nm) csp23nmSet.add(row.csp23nm);
        if (row.off_sub) offSubSet.add(row.off_sub);
        if (row.off_desc) offDescSet.add(row.off_desc);
    });

    console.log("Force values:", forceSet); // Debugging
    console.log("CSP23nm values:", csp23nmSet); // Debugging
    console.log("Offense Subcategory values:", offSubSet); // Debugging
    console.log("Offense Description values:", offDescSet); // Debugging

    populateDropdown('force-selector', forceSet);
    populateDropdown('csp23nm-selector', csp23nmSet);
    populateDropdown('off_sub-selector', offSubSet);
    populateDropdown('off_desc-selector', offDescSet);
}

// Helper function to populate a dropdown
function populateDropdown(selectorId, items) {
    const selector = document.getElementById(selectorId);
    if (selector) {
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.text = item;
            selector.appendChild(option);
        });
    } else {
        console.error("Dropdown selector not found:", selectorId); // Debugging
    }
}

// Function to filter and sum data based on selected filters
function filterAndSumData(data, filters) {
    const filteredData = data.filter(row => {
        return (filters.force === row.force) &&
               (filters.csp23nm === row.csp23nm) &&
               (filters.off_sub === row.off_sub) &&
               (filters.off_desc === row.off_desc);
    });

    const groupedData = {};

    filteredData.forEach(row => {
        if (!groupedData[row.fy]) {
            groupedData[row.fy] = 0;
        }
        groupedData[row.fy] += parseInt(row.total_off_count, 10);
    });

    return groupedData;
}

// Function to plot the data
function plotData(groupedData) {
    const fyValues = Object.keys(groupedData).sort();
    const totals = fyValues.map(fy => groupedData[fy]);

    const plotData = [{
        x: fyValues,
        y: totals,
        type: 'scatter',
        mode: 'lines+markers'
    }];

    Plotly.newPlot('chart', plotData, { title: 'Total Offenses by Fiscal Year' });
}

// Function to handle filter changes and update the chart
function updateChart(data) {
    const filters = {
        force: document.getElementById('force-selector').value,
        csp23nm: document.getElementById('csp23nm-selector').value,
        off_sub: document.getElementById('off_sub-selector').value,
        off_desc: document.getElementById('off_desc-selector').value
    };

    const groupedData = filterAndSumData(data, filters);
    plotData(groupedData);
}

// Initialize the chart with default data
async function init() {
    const data = await fetchData();
    if (data) {
        populateDropdowns(data);

        document.getElementById('force-selector').addEventListener('change', () => updateChart(data));
        document.getElementById('csp23nm-selector').addEventListener('change', () => updateChart(data));
        document.getElementById('off_sub-selector').addEventListener('change', () => updateChart(data));
        document.getElementById('off_desc-selector').addEventListener('change', () => updateChart(data));

        // Initial plot based on the first available option in each dropdown
        updateChart(data);
    }
}

// Initialize the chart on page load
init();

