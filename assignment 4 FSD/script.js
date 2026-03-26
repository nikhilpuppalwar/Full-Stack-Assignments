const API_URL = 'https://api.freeapi.app/api/v1/public/stocks';

// DOM Elements
const globalStatsContainer = document.getElementById('globalStats');
const marketCapCanvas = document.getElementById('marketCapChart');
const roePeCanvas = document.getElementById('roePeChart');
const dividendCanvas = document.getElementById('dividendChart');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const tableBody = document.querySelector('#stockTable tbody');

// State
let allStocks = [];
let marketCapChartInstance = null;
let roePeChartInstance = null;
let dividendChartInstance = null;

// Utility: specific parser for Indian numbers and currency
function parseCurrency(str) {
    if (!str) return 0;
    // Remove ₹, spaces, commas, and unit text like 'Cr.', '%'
    const cleanStr = str.replace(/[₹\s,Cr.%]/g, '');
    return parseFloat(cleanStr) || 0;
}

function parsePercentage(str) {
    if (!str) return 0;
    return parseFloat(str.replace(/[%]/g, '')) || 0;
}

// Fetch Data
async function fetchStocks() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Handle API structure: { data: { data: [...] } } or { data: [...] }
        const stocks = data.data && data.data.data ? data.data.data : data.data;

        if (Array.isArray(stocks)) {
            // Process data for easier sorting/filtering
            allStocks = stocks.map(stock => ({
                ...stock,
                marketCapValue: parseCurrency(stock.MarketCap),
                priceValue: parseCurrency(stock.CurrentPrice),
                peValue: parseFloat(stock.StockPE) || 0,
                divYieldValue: parseCurrency(stock.DividendYield),
                roeValue: parsePercentage(stock.ROE)
            }));

            // Initial Render
            updateDashboard();
        } else {
            console.error('Unexpected API structure:', data);
        }
    } catch (error) {
        console.error('Error fetching stocks:', error);
        globalStatsContainer.innerHTML = '<p class="error">Failed to load stock data.</p>';
    }
}

// Render Global Stats
function renderGlobalStats(stocks) {
    // Example Stats: Top Gainer (highest price for now as we don't have % change), Total Market Cap of list
    // Since API doesn't give % change, we'll show highest PE or highest Price stock

    const highestPrice = stocks.reduce((prev, current) => (prev.priceValue > current.priceValue) ? prev : current, stocks[0]);
    const lowestPE = stocks.filter(s => s.peValue > 0).reduce((prev, current) => (prev.peValue < current.peValue) ? prev : current, stocks[0]);

    // Sort by Market Cap to find "Most Valuable"
    const mostValuable = [...stocks].sort((a, b) => b.marketCapValue - a.marketCapValue)[0];

    const stats = [
        { label: 'Most Valuable', value: mostValuable.Name, sub: mostValuable.MarketCap },
        { label: 'Highest Price', value: highestPrice.Symbol, sub: highestPrice.CurrentPrice },
        { label: 'Lowest P/E Ratio', value: lowestPE.Symbol, sub: lowestPE.StockPE },
        { label: 'Total Stocks Listed', value: stocks.length, sub: 'in this view' }
    ];

    globalStatsContainer.innerHTML = stats.map(stat => `
        <div class="stat-card">
            <span class="stat-label">${stat.label}</span>
            <div class="stat-value" style="font-size: 1.2rem;">${stat.value}</div>
            <span class="stat-label" style="color: var(--primary-color)">${stat.sub}</span>
        </div>
    `).join('');
}

// Render Market Cap Bar Chart
function renderMarketCapChart(stocks) {
    // Sort by Market Cap descending and take top 10
    const top10 = [...stocks].sort((a, b) => b.marketCapValue - a.marketCapValue).slice(0, 10);

    const labels = top10.map(s => s.Symbol);
    const data = top10.map(s => s.marketCapValue);

    if (marketCapChartInstance) marketCapChartInstance.destroy();

    marketCapChartInstance = new Chart(marketCapCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Market Cap (₹ Cr.)',
                data: data,
                backgroundColor: '#bb86fc', // Primary color
                borderColor: '#bb86fc',
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: '#03dac6' // Secondary
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#333' },
                    ticks: { color: '#a0a0a0' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#a0a0a0' }
                }
            },
            plugins: {
                legend: { display: false, labels: { color: '#e0e0e0' } },
                title: { display: false }
            }
        }
    });
}

// Render ROE vs PE Scatter Chart
function renderRoePeChart(stocks) {
    // Filter reasonable range to avoid outliers skewing chart too much
    const filtered = stocks.filter(s => s.peValue > 0 && s.peValue < 100 && s.roeValue > 0 && s.roeValue < 50);

    const data = filtered.map(s => ({
        x: s.peValue,
        y: s.roeValue,
        stockName: s.Symbol
    }));

    if (roePeChartInstance) roePeChartInstance.destroy();

    roePeChartInstance = new Chart(roePeCanvas, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'ROE vs P/E',
                data: data,
                backgroundColor: 'rgba(3, 218, 198, 0.6)',
                borderColor: '#03dac6',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: { display: true, text: 'P/E Ratio', color: '#a0a0a0' },
                    grid: { color: '#333' },
                    ticks: { color: '#a0a0a0' }
                },
                y: {
                    title: { display: true, text: 'ROE (%)', color: '#a0a0a0' },
                    grid: { color: '#333' },
                    ticks: { color: '#a0a0a0' }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const point = context.raw;
                            return `${point.stockName}: P/E ${point.x}, ROE ${point.y}%`;
                        }
                    }
                },
                legend: { display: false }
            }
        }
    });
}

// Render Dividend Yield Doughnut Chart
function renderDividendChart(stocks) {
    const highYield = stocks.filter(s => s.divYieldValue > 1.5).length;
    const moderateYield = stocks.filter(s => s.divYieldValue > 0 && s.divYieldValue <= 1.5).length;
    const noYield = stocks.filter(s => s.divYieldValue === 0).length;

    if (dividendChartInstance) dividendChartInstance.destroy();

    dividendChartInstance = new Chart(dividendCanvas, {
        type: 'doughnut',
        data: {
            labels: ['> 1.5%', '0 - 1.5%', '0% (No Div)'],
            datasets: [{
                data: [highYield, moderateYield, noYield],
                backgroundColor: ['#4caf50', '#29b6f6', '#cf6679'],
                borderColor: '#121212',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#e0e0e0' } }
            }
        }
    });
}

// Render Table
function renderTable(stocks) {
    if (stocks.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No stocks found</td></tr>';
        return;
    }

    tableBody.innerHTML = stocks.map(stock => `
        <tr>
            <td class="symbol">${stock.Symbol}</td>
            <td>${stock.Name}</td>
            <td class="text-right">${stock.CurrentPrice}</td>
            <td class="text-right">${stock.MarketCap}</td>
            <td class="text-right">${stock.StockPE}</td>
            <td class="text-right">${stock.DividendYield}</td>
            <td class="text-right">${stock.HighLow}</td>
        </tr>
    `).join('');
}

// Filter and Sort
function updateDashboard() {
    const searchTerm = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    let filtered = allStocks.filter(stock =>
        stock.Name.toLowerCase().includes(searchTerm) ||
        stock.Symbol.toLowerCase().includes(searchTerm)
    );

    // Sorting
    filtered.sort((a, b) => {
        if (sortValue === 'marketCapDesc') return b.marketCapValue - a.marketCapValue;
        if (sortValue === 'marketCapAsc') return a.marketCapValue - b.marketCapValue;
        if (sortValue === 'priceDesc') return b.priceValue - a.priceValue;
        if (sortValue === 'priceAsc') return a.priceValue - b.priceValue;
        return 0;
    });

    const dataToPlot = filtered.length > 0 ? filtered : allStocks;
    renderMarketCapChart(dataToPlot);
    renderRoePeChart(dataToPlot);
    renderDividendChart(dataToPlot);
    renderTable(filtered);

    // Only update global stats if we haven't filtered too much? 
    // Actually, usually global stats reflect the whole dataset, let's keep it that way for context
    if (searchTerm === '') renderGlobalStats(allStocks);
}

// Event Listeners
searchInput.addEventListener('input', updateDashboard);
sortSelect.addEventListener('change', updateDashboard);

// Init
fetchStocks();
