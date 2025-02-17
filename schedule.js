document.addEventListener("DOMContentLoaded", function () {
    fetch("schedule.json")
        .then(response => response.json())
        .then(games => {
            let tableBody = document.getElementById("schedule-body");
            tableBody.innerHTML = games.map(game => {
                let resultClass = "";
                if (game.Result.startsWith("W")) {
                    resultClass = "win";
                } else if (game.Result.startsWith("L")) {
                    resultClass = "loss";
                }
                return `
                    <tr>
                        <td>${game.Date}</td>
                        <td>${game.Opponent}</td>
                        <td>${game.Location}</td>
                        <td>${game.Time}</td>
                        <td class="${resultClass}">${game.Result || "TBD"}</td>
                    </tr>
                `;
            }).join("");
        })
        .catch(error => console.error("Error loading schedule:", error));
});

function filterGames() {
    let input = document.getElementById("searchGame").value.toLowerCase();
    let rows = document.querySelectorAll("#schedule-table tbody tr");

    rows.forEach(row => {
        let opponent = row.cells[1].innerText.toLowerCase();
        row.style.display = opponent.includes(input) ? "" : "none";
    });
}
