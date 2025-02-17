document.addEventListener("DOMContentLoaded", function () {
    fetch("players.json")
        .then(response => response.json())
        .then(players => {
            const rosterContainer = document.getElementById("roster-container");

            if (!rosterContainer) {
                console.error("⚠️ Error: Roster container not found!");
                return;
            }

            let rosterHTML = `
                <table class="roster-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>B/T</th>
                            <th>Class</th>
                            <th>Hometown</th>
                            <th>Previous School</th>
                            <th>Social</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            players.forEach(player => {
                rosterHTML += `
                    <tr class="player-row" data-id="${player.Number}">
                        <td>${player.Number}</td>
                        <td>${player.Name}</td>
                        <td>${player.Position}</td>
                        <td>${player.Height}</td>
                        <td>${player.Weight}</td>
                        <td>${player.BatsThrows}</td>
                        <td>${player.Class}</td>
                        <td>${player.Hometown}</td>
                        <td>${player["Previous School"] || "N/A"}</td>
                        <td>
                            ${player.Twitter ? `<a href="https://twitter.com/${player.Twitter}" target="_blank">🐦</a>` : ""}
                            ${player.Instagram ? `<a href="https://instagram.com/${player.Instagram}" target="_blank">📸</a>` : ""}
                        </td>
                    </tr>
                `;
            });

            rosterHTML += `</tbody></table>`;
            rosterContainer.innerHTML = rosterHTML;

            // Add click event listener to each row
            document.querySelectorAll(".player-row").forEach(row => {
                row.addEventListener("click", function () {
                    const playerId = this.getAttribute("data-id");
                    window.location.href = `player.html?number=${playerId}`;
                });
            });
        })
        .catch(error => console.error("Error loading roster:", error));
});
