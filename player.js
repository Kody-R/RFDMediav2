document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playerNumber = urlParams.get("number");

    if (!playerNumber) {
        console.error("No player number provided in URL");
        return;
    }

    Promise.all([
        fetch("players.json").then(res => res.json()),
        fetch("stats.json").then(res => res.json())
    ])
    .then(([players, stats]) => {
        // Ensure player number is treated as a string for comparison
        const player = players.find(p => String(p.Number) === playerNumber);

        if (!player) {
            console.error("Player not found");
            document.getElementById("player-name").textContent = "Player Not Found";
            return;
        }

        // Populate player details
        document.getElementById("player-name").textContent = player.Name;
        document.getElementById("player-position").textContent = player.Position;
        document.getElementById("player-height").textContent = player.Height;
        document.getElementById("player-weight").textContent = player.Weight;
        document.getElementById("player-bats-throws").textContent = player.BatsThrows;
        document.getElementById("player-class").textContent = player.Class;
        document.getElementById("player-hometown").textContent = `${player.Hometown} / ${player["High School"] || "N/A"}`;
        document.getElementById("player-previous-school").textContent = player.PreviousSchool || "N/A";

        // Set player image if available
        const playerImage = document.getElementById("player-image");
        playerImage.src = player.Image ? player.Image : "default.png";

        // Populate social media links (Only show if available)
        const socialDiv = document.getElementById("player-social");
        let socialHTML = `<p>`;
        if (player.Twitter) {
            socialHTML += `<a href="https://twitter.com/${player.Twitter}" target="_blank">Twitter</a> `;
        }
        if (player.Instagram) {
            socialHTML += `<a href="https://instagram.com/${player.Instagram}" target="_blank">Instagram</a>`;
        }
        socialHTML += `</p>`;
        socialDiv.innerHTML = socialHTML;

        // Convert playerNumber to a number for comparison with stats
        const playerNumberInt = parseInt(playerNumber, 10);

        // Find matching stats in position_players or pitchers using "Number" instead of "#"
        const positionStats = stats.position_players.find(p => parseInt(p.Number, 10) === playerNumberInt);
        const pitcherStats = stats.pitchers.find(p => parseInt(p.Number, 10) === playerNumberInt);
        const statsDiv = document.getElementById("player-highlight");

        if (positionStats) {
            statsDiv.innerHTML = generatePositionPlayerTable(positionStats);
        } else if (pitcherStats) {
            statsDiv.innerHTML = generatePitcherTable(pitcherStats);
        } else {
            statsDiv.innerHTML = "<p>No stats available for this player.</p>";
        }
    })
    .catch(error => console.error("Error loading player data:", error));
});

// Helper function to generate position player stats table
function generatePositionPlayerTable(stats) {
    return `
        <h2>Position Player Stats</h2>
        <table class="player-stats-table">
            <tr><th>AVG</th><th>OPS</th><th>GP-GS</th><th>AB</th><th>R</th><th>H</th><th>2B</th><th>3B</th><th>HR</th><th>RBI</th></tr>
            <tr>
                <td>${stats.AVG}</td><td>${stats.OPS}</td><td>${stats["GP-GS"]}</td><td>${stats.AB}</td><td>${stats.R}</td>
                <td>${stats.H}</td><td>${stats["2B"]}</td><td>${stats["3B"]}</td><td>${stats.HR}</td><td>${stats.RBI}</td>
            </tr>
        </table>
    `;
}

// Helper function to generate pitcher stats table
function generatePitcherTable(stats) {
    return `
        <h2>Pitcher Stats</h2>
        <table class="player-stats-table">
            <tr><th>ERA</th><th>WHIP</th><th>W-L</th><th>APP-GS</th><th>IP</th><th>H</th><th>R</th><th>ER</th><th>BB</th><th>SO</th></tr>
            <tr>
                <td>${stats.ERA}</td><td>${stats.WHIP}</td><td>${stats["W-L"]}</td><td>${stats.APP}-${stats.GS}</td><td>${stats.IP}</td>
                <td>${stats.H}</td><td>${stats.R}</td><td>${stats.ER}</td><td>${stats.BB}</td><td>${stats.SO}</td>
            </tr>
        </table>
    `;
}
