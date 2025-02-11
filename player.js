document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get("id");

    if (!playerId) {
        document.getElementById("player-name").innerText = "Player Not Found";
        return;
    }

    // Fetch both players.json and stats.json
    Promise.all([
        fetch("players.json").then(response => response.json()),
        fetch("stats.json").then(response => response.json())
    ])
    .then(([players, stats]) => {
        const player = players.find(p => p.Number === playerId);

        if (!player) {
            document.getElementById("player-name").innerText = "Player Not Found";
            return;
        }

        // Update player details
        document.getElementById("player-name").innerText = player.Name;
        document.getElementById("player-position").innerText = player.Position;
        document.getElementById("player-height").innerText = player.Height;
        document.getElementById("player-weight").innerText = player.Weight;
        document.getElementById("player-bats-throws").innerText = player.BatsThrows;
        document.getElementById("player-class").innerText = player.Class;
        document.getElementById("player-hometown").innerText = player.Hometown;
        document.getElementById("player-previous-school").innerText = player["Previous School"] || "N/A";

        // Player Image (if available)
        document.getElementById("player-image").src = player.Image || "default-player.jpg";

        // Social Media Links
        document.getElementById("player-social").innerHTML = `
            <div class="social-icons">
                ${player.Twitter ? `<a href="https://twitter.com/${player.Twitter}" target="_blank">🐦 Twitter</a>` : ""}
                ${player.Instagram ? `<a href="https://instagram.com/${player.Instagram}" target="_blank">📸 Instagram</a>` : ""}
            </div>
        `;

        // Match player stats
        let playerStats = stats.position_players.find(p => p.Number == playerId) ||
                          stats.pitchers.find(p => p.Number == playerId);
        // Inside player.js (Modify How Stats Are Inserted)
        if (playerStats) {
            let statsHTML = `
                <div class="player-stats-grid"> <!-- ✅ Added Flexbox Grid -->
                    <table class='player-stats'>
                        <thead><tr><th colspan="2">Player Stats</th></tr></thead>
                        <tbody>
            `;
        
            if (stats.position_players.some(p => p.Number == playerId)) {
                // Position Player Stats
                statsHTML += `
                    <tr><th>AVG</th><td>${playerStats.AVG}</td></tr>
                    <tr><th>OPS</th><td>${playerStats.OPS}</td></tr>
                    <tr><th>GP-GS</th><td>${playerStats["GP-GS"]}</td></tr>
                    <tr><th>AB</th><td>${playerStats.AB}</td></tr>
                    <tr><th>R</th><td>${playerStats.R}</td></tr>
                    <tr><th>H</th><td>${playerStats.H}</td></tr>
                    <tr><th>HR</th><td>${playerStats.HR}</td></tr>
                    <tr><th>RBI</th><td>${playerStats.RBI}</td></tr>
                    <tr><th>SLG%</th><td>${playerStats["SLG%"]}</td></tr>
                    <tr><th>OB%</th><td>${playerStats["OB%"]}</td></tr>
                `;
            } else {
                // Pitcher Stats
                statsHTML += `
                    <tr><th>ERA</th><td>${playerStats.ERA}</td></tr>
                    <tr><th>WHIP</th><td>${playerStats.WHIP}</td></tr>
                    <tr><th>W-L</th><td>${playerStats["W-L"]}</td></tr>
                    <tr><th>APP-GS</th><td>${playerStats["APP-GS"]}</td></tr>
                    <tr><th>IP</th><td>${playerStats.IP}</td></tr>
                    <tr><th>H</th><td>${playerStats.H}</td></tr>
                    <tr><th>ER</th><td>${playerStats.ER}</td></tr>
                    <tr><th>BB</th><td>${playerStats.BB}</td></tr>
                    <tr><th>SO</th><td>${playerStats.SO}</td></tr>
                    <tr><th>B/AVG</th><td>${playerStats["B/AVG"]}</td></tr>
                `;
            }
        
            statsHTML += "</tbody></table></div>";
            document.getElementById("player-stats").innerHTML = statsHTML;
        }

    })
    .catch(error => console.error("Error loading player data:", error));
});
