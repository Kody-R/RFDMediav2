document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get("id");

    if (!playerId) {
        document.getElementById("player-name").innerText = "Player Not Found";
        return;
    }

    fetch("players.json")
        .then(response => response.json())
        .then(players => {
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

            // Highlight Video (if available)
            if (player.HighlightVideo) {
                document.getElementById("player-highlight").innerHTML = `
                    <h2>Highlight Video</h2>
                    <iframe width="560" height="315" src="${player.HighlightVideo}" frameborder="0" allowfullscreen></iframe>
                `;
            }
        })
        .catch(error => console.error("Error loading player data:", error));
});
