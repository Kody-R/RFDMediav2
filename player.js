document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get("id");

    fetch("player.json")
        .then(response => response.json())
        .then(players => {
            const player = players.find(p => p.id === playerId);
            if (player) {
                document.getElementById("player-name").textContent = player.name;
                document.getElementById("player-img").src = player.img;
                document.getElementById("player-bio").textContent = player.bio;
                document.getElementById("player-position").textContent = player.position;
                document.getElementById("player-avg").textContent = player.avg;
                document.getElementById("player-hr").textContent = player.home_runs;
                document.getElementById("player-rbi").textContent = player.rbi;
                document.getElementById("player-era").textContent = player.era;
                document.getElementById("player-video").src = player.highlight_video;
            } else {
                document.getElementById("player-profile").innerHTML = "<p>Player not found.</p>";
            }
        })
        .catch(error => console.error("Error loading player:", error));
});
