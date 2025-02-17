document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playerNumber = urlParams.get("number");

    if (!playerNumber) {
        console.error("❌ No player number provided in URL.");
        return;
    }

    Promise.all([
        fetch("players.json").then(res => res.json()),
        fetch("stats.json").then(res => res.json())
    ])
    .then(([players, stats]) => {
        const player = players.find(p => String(p.Number) === playerNumber);

        if (!player) {
            console.error("❌ Player not found.");
            document.getElementById("player-name").textContent = "Player Not Found";
            return;
        }

        // Populate player details
        document.getElementById("player-name").textContent = player.Player;
        document.getElementById("player-position").textContent = player.Position;
        document.getElementById("player-height").textContent = player.Height;
        document.getElementById("player-weight").textContent = player.Weight;
        document.getElementById("player-bats-throws").textContent = player.BatsThrows;
        document.getElementById("player-class").textContent = player.Class;
        document.getElementById("player-hometown").textContent = `${player.Hometown} / ${player["High School"] || "N/A"}`;
        document.getElementById("player-previous-school").textContent = player.PreviousSchool || "N/A";

        // Set player image
        const playerImage = document.getElementById("player-image");
        playerImage.src = player.Image ? player.Image : "images/default.png";

        // Populate social media links
        document.getElementById("player-social").innerHTML = `
            <div class="social-icons">
                ${player.Twitter ? `<a href="https://twitter.com/${player.Twitter}" target="_blank">🐦 Twitter</a>` : ""}
                ${player.Instagram ? `<a href="https://instagram.com/${player.Instagram}" target="_blank">📸 Instagram</a>` : ""}
            </div>
        `;

        // Convert playerNumber to integer for stat matching
        const playerNumberInt = parseInt(playerNumber, 10);

        // Find stats for position players and pitchers
        const positionStats = stats.position_players.find(p => parseInt(p.Number, 10) === playerNumberInt);
        const pitcherStats = stats.pitchers.find(p => parseInt(p.Number, 10) === playerNumberInt);
        const statsDiv = document.getElementById("player-highlight");

        let statsHTML = "";

        if (positionStats) {
            statsHTML = generatePositionStats(positionStats);
        } else if (pitcherStats) {
            statsHTML = generatePitcherStats(pitcherStats);
        } else {
            statsHTML = "<p>No stats available for this player.</p>";
        }

        statsDiv.innerHTML = `
            <div class="toggle-button-container">
                <button class="toggle-button" onclick="toggleStatsView()">🔄 Switch Stats View</button>
            </div>
            <div id="stats-content">${statsHTML}</div>
        `;
    })
    .catch(error => console.error("❌ Error loading player data:", error));
});

// Function to toggle between Grid and Table
let statsView = "grid"; // Default view

function toggleStatsView() {
    const statsDiv = document.getElementById("stats-content");
    statsView = (statsView === "grid") ? "table" : "grid";

    const playerNumber = new URLSearchParams(window.location.search).get("number");
    
    // Fetch stats again and regenerate layout
    fetch("stats.json")
        .then(res => res.json())
        .then(stats => {
            const playerNumberInt = parseInt(playerNumber, 10);
            const positionStats = stats.position_players.find(p => parseInt(p.Number, 10) === playerNumberInt);
            const pitcherStats = stats.pitchers.find(p => parseInt(p.Number, 10) === playerNumberInt);

            if (statsView === "grid") {
                statsDiv.innerHTML = `${positionStats ? generatePositionStats(positionStats) : ""}
                                      ${pitcherStats ? generatePitcherStats(pitcherStats) : ""}`;
            } else {
                statsDiv.innerHTML = `${positionStats ? generateTablePositionStats(positionStats) : ""}
                                      ${pitcherStats ? generateTablePitcherStats(pitcherStats) : ""}`;
            }
        });
}

// Position Player Stats - Grid View
function generatePositionStats(stats) {
    return `
        <h2>Position Player Stats</h2>
        <div class="player-stats-grid">
            <div class="stat-box">AVG: ${stats.AVG}</div>
            <div class="stat-box">OPS: ${stats.OPS}</div>
            <div class="stat-box">GP-GS: ${stats["GP-GS"]}</div>
            <div class="stat-box">AB: ${stats.AB}</div>
            <div class="stat-box">R: ${stats.R}</div>
            <div class="stat-box">H: ${stats.H}</div>
            <div class="stat-box">2B: ${stats["2B"]}</div>
            <div class="stat-box">3B: ${stats["3B"]}</div>
            <div class="stat-box">HR: ${stats.HR}</div>
            <div class="stat-box">RBI: ${stats.RBI}</div>
        </div>
    `;
}

// Pitcher Stats - Grid View
function generatePitcherStats(stats) {
    return `
        <h2>Pitcher Stats</h2>
        <div class="player-stats-grid">
            <div class="stat-box">ERA: ${stats.ERA}</div>
            <div class="stat-box">WHIP: ${stats.WHIP}</div>
            <div class="stat-box">W-L: ${stats["W-L"]}</div>
            <div class="stat-box">APP: ${stats.APP}</div>
            <div class="stat-box">GS: ${stats.GS}</div>
            <div class="stat-box">IP: ${stats.IP}</div>
            <div class="stat-box">H: ${stats.H}</div>
            <div class="stat-box">R: ${stats.R}</div>
            <div class="stat-box">ER: ${stats.ER}</div>
            <div class="stat-box">SO: ${stats.SO}</div>
        </div>
    `;
}

// Table Layout for Position Players
function generateTablePositionStats(stats) {
    return `
        <table class="player-stats">
            <thead>
                <tr><th>AVG</th><th>OPS</th><th>GP-GS</th><th>AB</th><th>R</th><th>H</th><th>2B</th><th>3B</th><th>HR</th><th>RBI</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>${stats.AVG}</td><td>${stats.OPS}</td><td>${stats["GP-GS"]}</td><td>${stats.AB}</td><td>${stats.R}</td>
                    <td>${stats.H}</td><td>${stats["2B"]}</td><td>${stats["3B"]}</td><td>${stats.HR}</td><td>${stats.RBI}</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Table Layout for Pitchers
function generateTablePitcherStats(stats) {
    return `
        <table class="player-stats">
            <thead>
                <tr><th>ERA</th><th>WHIP</th><th>W-L</th><th>APP</th><th>GS</th><th>IP</th><th>H</th><th>R</th><th>ER</th><th>SO</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>${stats.ERA}</td><td>${stats.WHIP}</td><td>${stats["W-L"]}</td><td>${stats.APP}</td><td>${stats.GS}</td>
                    <td>${stats.IP}</td><td>${stats.H}</td><td>${stats.R}</td><td>${stats.ER}</td><td>${stats.SO}</td>
                </tr>
            </tbody>
        </table>
    `;
}
