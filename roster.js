document.addEventListener("DOMContentLoaded", function () {
    fetch("player.json")
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
                    <tr>
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
        })
        .catch(error => console.error("Error loading roster:", error));
});
