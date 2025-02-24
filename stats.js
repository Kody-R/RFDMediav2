document.addEventListener("DOMContentLoaded", async () => {
    const teamTable = document.getElementById("team-stats-table");
    const player1Select = document.getElementById("player1");
    const player2Select = document.getElementById("player2");

    try {
        const response = await fetch("stats.json");
        const statsData = await response.json();

        // 🏆 Load Team Stats
        loadTeamStats(statsData.team_stats, teamTable);

        // 🏅 Load Player Comparison
        loadPlayerDropdowns(statsData.position_players, player1Select, player2Select);
        setupComparisonChart(statsData.position_players);

        // 📈 Advanced Analytics Chart
        setupAdvancedChart(statsData.advanced_metrics);

        // 🔥 Game-by-Game Performance
        setupPerformanceChart(statsData.player_game_performance);
    } catch (error) {
        console.error("Error loading stats data:", error);
    }
});

// 🏆 Function to Load Team Stats
function loadTeamStats(stats, table) {
    table.innerHTML = `
        <tr>
            <th>Category</th>
            <th>Value</th>
        </tr>
        ${Object.entries(stats).map(([key, value]) => `
            <tr><td>${key}</td><td>${value}</td></tr>
        `).join('')}
    `;
}

// 🏅 Load Player Dropdowns
function loadPlayerDropdowns(players, select1, select2) {
    players.forEach(player => {
        let option = new Option(player.Player, player.Number);
        select1.add(option.cloneNode(true));
        select2.add(option.cloneNode(true));
    });
}

// 📊 Setup Player Comparison Chart
function setupComparisonChart(players) {
    let ctx = document.getElementById("comparisonChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["AVG", "OPS", "HR", "RBI"],
            datasets: players.map(player => ({
                label: player.Player,
                data: [player.AVG, player.OPS, player.HR, player.RBI]
            }))
        },
        options: { responsive: true }
    });
}

// 📈 Advanced Metrics Chart
function setupAdvancedChart(metrics) {
    let ctx = document.getElementById("advancedChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: metrics.labels,
            datasets: metrics.data.map((stat, i) => ({
                label: stat.name,
                data: stat.values
            }))
        },
        options: { responsive: true }
    });
}

// 🔥 Player Game-by-Game Performance Chart
function setupPerformanceChart(games) {
    let ctx = document.getElementById("performanceChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: games.map(game => game.date),
            datasets: [{
                label: "Batting Avg",
                data: games.map(game => game.avg),
                borderColor: "blue",
                fill: false
            }]
        },
        options: { responsive: true }
    });
}
