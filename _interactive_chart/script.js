// URL to your CSV file
const csvUrl = 'https://raw.githubusercontent.com/routineactivity/routineactivity.github.io/master/_datasets/csp_annual.csv';

// Function to fetch and parse the CSV data
async function fetchData() {
    try {
        const response = await fetch(csvUrl);
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;
        return parsedData;
    } catch (error) {
        console.error("Error fetching the data:", error);
    }
}

// Function to populate dropdowns with unique values from the data
function populateDropdowns(data) {
    const forceSet = new Set();
    const csp23nmMap = {};
    const offSubSet = new Set();
    const offDescMap = {};

    data.forEach(row => {
        if (row.force) {
            forceSet.add(row.force);
            if (!csp23nmMap[row.force]) {
                csp23nmMap[row.force] = new Set();
            }
            csp23nmMap[row.force].add(row.csp23nm);
        }
        if (row.off_sub) {
            offSubSet.add(row.off_sub);
            if (!offDescMap[row.off_sub]) {
                offDescMap[row.off_sub] = new Set();
            }
            offDescMap[row.off_sub].add(row.off_desc);
        }
    });

    populateDropdown('force-selector', forceSet);
    populateDropdown('off_sub-selector', offSubSet);

    // Store the mappings for dependent dropdowns
    window.csp23nmMap = csp23nmMap;
    window.offDescMap = offDescMap;
}

// Helper function to populate a dropdown
function populateDropdown(selectorId, items) {
    const selector = document.getElementById(selectorId);
    selector.innerHTML = ''; // Clear existing options
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.text = item;
        selector.appendChild(option);
    });
}

// Function to handle force change and update csp23nm options
function handleForceChange() {
    const selectedForce = document.getElementById('force-selector').value;
    const relatedCsp23nm = window.csp23nmMap[selectedForce];
    populateDropdown('csp23nm-selector', relatedCsp23nm);
    updateChart(); // Update chart when dependent dropdown changes
}

// Function to handle off_sub change and update off_desc options
function handleOffSubChange() {
    const selectedOffSub = document.getElementById('off_sub-selector').value;
    const relatedOffDesc = window.offDescMap[selectedOffSub];
    populateDropdown('off_desc-selector', relatedOffDesc);
    updateChart(); // Update chart when dependent dropdown changes
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
function updateChart() {
    const filters = {
        force: document.getElementById('force-selector').value,
        csp23nm: document.getElementById('csp23nm-selector').value,
        off_sub: document.getElementById('off_sub-selector').value,
        off_desc: document.getElementById('off_desc-selector').value
    };

    fetchData().then(data => {
        const groupedData = filterAndSumData(data, filters);
        plotData(groupedData);
    });
}

// Initialize the chart with default data
async function init() {
    const data = await fetchData();
    if (data) {
        populateDropdowns(data);

        document.getElementById('force-selector').addEventListener('change', handleForceChange);
        document.getElementById('csp23nm-selector').addEventListener('change', updateChart);
        document.getElementById('off_sub-selector').addEventListener('change', handleOffSubChange);
        document.getElementById('off_desc-selector').addEventListener('change', updateChart);

        // Initial plot based on the first available option in each dropdown
        updateChart();
    }
}

// Initialize the chart on page load
init();
