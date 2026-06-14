// Load models on page load
document.addEventListener('DOMContentLoaded', function() {
    loadModels();
    loadHistory();
});

// Load available models
async function loadModels() {
    try {
        const response = await fetch('/api/models');
        const models = await response.json();
        const select = document.getElementById('model-select');
        select.innerHTML = '<option value="">Select a model...</option>';
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model.split('/')[1] || model;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading models:', error);
        showStatus('Error loading models', 'error');
    }
}

// Run the consciousness probe
async function runProbe() {
    const modelSelect = document.getElementById('model-select');
    const model = modelSelect.value;

    if (!model) {
        showStatus('Please select a model', 'error');
        return;
    }

    const btn = document.getElementById('run-probe-btn');
    const progress = document.getElementById('progress');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    btn.disabled = true;
    progress.style.display = 'block';
    progressFill.style.width = '0%';
    showStatus('Loading model...', 'loading');

    try {
        // Simulate progress
        let currentProgress = 0;
        const progressInterval = setInterval(() => {
            if (currentProgress < 90) {
                currentProgress += Math.random() * 30;
                if (currentProgress > 90) currentProgress = 90;
                progressFill.style.width = currentProgress + '%';
            }
        }, 500);

        const response = await fetch('/api/run-probe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: model })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        clearInterval(progressInterval);
        progressFill.style.width = '100%';
        progressText.textContent = 'Tests completed!';

        showStatus('✅ Probe completed successfully!', 'success');
        displayResults(data);
        loadHistory();

        setTimeout(() => {
            progress.style.display = 'none';
            btn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('Error:', error);
        showStatus(`Error: ${error.message}`, 'error');
        progress.style.display = 'none';
        btn.disabled = false;
    }
}

// Display results
function displayResults(data) {
    const resultsPanel = document.getElementById('results-panel');
    const resultsInfo = document.getElementById('results-info');
    const tabsContainer = document.getElementById('tabs-container');
    const tabsContent = document.getElementById('tabs-content');
    const metricsChart = document.getElementById('metrics-chart');

    // Display info
    const timestamp = new Date(data.timestamp).toLocaleString();
    resultsInfo.innerHTML = `
        <p><strong>Model:</strong> ${data.model.split('/')[1]}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
    `;

    // Create tabs
    tabsContainer.innerHTML = '';
    tabsContent.innerHTML = '';

    data.results.forEach((result, index) => {
        // Tab button
        const tabBtn = document.createElement('button');
        tabBtn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
        tabBtn.textContent = `${index + 1}. ${result.test_name}`;
        tabBtn.onclick = () => switchTab(index, data.results.length);
        tabsContainer.appendChild(tabBtn);

        // Tab content
        const content = document.createElement('div');
        content.className = `tab-content ${index === 0 ? 'active' : ''}`;
        content.id = `tab-${index}`;
        content.innerHTML = `
            <div class="content-row">
                <label>Prompt:</label>
                <p>${result.prompt}</p>
            </div>
            <div class="content-row">
                <label>Response:</label>
                <p>${result.response}</p>
            </div>
            <div class="content-row">
                <label>Behavioral Score:</label>
                <p><strong>${(result.behavioral_metric * 100).toFixed(1)}%</strong></p>
            </div>
            <div class="content-row">
                <label>Interpretation:</label>
                <p>${result.behavioral_interpretation}</p>
            </div>
            <div class="metric-group">
                <div class="metric-box">
                    <label>Valence</label>
                    <div class="value">${result.valence.valence_level}</div>
                </div>
                <div class="metric-box">
                    <label>Coherence</label>
                    <div class="value">${(result.valence.coherence_score * 100).toFixed(0)}%</div>
                </div>
                <div class="metric-box">
                    <label>Meta-Aware</label>
                    <div class="value">${result.valence.meta_awareness ? '✅' : '❌'}</div>
                </div>
                <div class="metric-box">
                    <label>Intensity</label>
                    <div class="value" style="font-size: 0.9rem;">${result.valence.intensity_category}</div>
                </div>
            </div>
            <div class="content-row">
                <label>Direction:</label>
                <p><strong>${result.valence.direction.toUpperCase()}</strong></p>
            </div>
            <div class="content-row">
                <label>Synthesis:</label>
                <p>${result.synthesis}</p>
            </div>
        `;
        tabsContent.appendChild(content);
    });

    // Create metrics chart
    metricsChart.innerHTML = '<h3 style="margin-bottom: 1rem;">📈 Metrics Overview</h3>';
    data.results.forEach(result => {
        const direction = result.valence.direction;
        const barClass = `bar ${direction}`;
        const barWidth = (result.behavioral_metric * 100);
        
        const chartBar = document.createElement('div');
        chartBar.className = 'chart-bar';
        chartBar.innerHTML = `
            <div class="chart-label">${result.test_name}</div>
            <div class="chart-container">
                <div class="${barClass}" style="width: ${barWidth}%;"></div>
            </div>
            <div class="chart-value">${(result.behavioral_metric * 100).toFixed(1)}%</div>
        `;
        metricsChart.appendChild(chartBar);
    });

    resultsPanel.style.display = 'block';
    resultsPanel.scrollIntoView({ behavior: 'smooth' });
}

// Switch between tabs
function switchTab(index, total) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });

    // Update content
    for (let i = 0; i < total; i++) {
        const content = document.getElementById(`tab-${i}`);
        content.classList.toggle('active', i === index);
    }
}

// Show status message
function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';

    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            status.style.display = 'none';
        }, 5000);
    }
}

// Load and display history
async function loadHistory() {
    try {
        const response = await fetch('/api/history');
        const history = await response.json();
        const historyList = document.getElementById('history-list');

        if (history.length === 0) {
            historyList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 1rem;">No run history yet</p>';
            return;
        }

        historyList.innerHTML = '';
        history.forEach((entry, index) => {
            const timestamp = new Date(entry.timestamp);
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <p class="history-model">${entry.model.split('/')[1]}</p>
                <p class="history-time">${timestamp.toLocaleString()}</p>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Tests: ${entry.results.length}</p>
            `;
            item.onclick = () => displayResults({
                model: entry.model,
                timestamp: entry.timestamp,
                results: entry.results
            });
            historyList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading history:', error);
    }
}

// Clear history
async function clearHistory() {
    if (!confirm('Are you sure you want to clear all run history?')) return;

    try {
        await fetch('/api/clear-history', { method: 'POST' });
        loadHistory();
        showStatus('✅ History cleared', 'success');
    } catch (error) {
        console.error('Error:', error);
        showStatus('Error clearing history', 'error');
    }
}
