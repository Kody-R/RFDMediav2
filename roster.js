document.addEventListener("DOMContentLoaded", function () {
    fetch("player.json")
        .then(response => response.json())
        .then(players => {
            const tbody = document.querySelector("#roster-table tbody");
            tbody.innerHTML = players.map(player => `
                <tr>
                    <td><a href="player.html?id=${player.id}">${player.name}</a></td>
                    <td>${player.position}</td>
                    <td>${player.avg}</td>
                    <td>${player.home_runs}</td>
                    <td>${player.rbi}</td>
                    <td>${player.era}</td>
                </tr>
            `).join("");
        })
        .catch(error => console.error("Error loading players:", error));
});

// Sorting function (supports numeric values)
function sortTable(columnIndex) {
    const table = document.getElementById("roster-table");
    const rows = Array.from(table.rows).slice(1);
    const sortedRows = rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].textContent.trim();
        const cellB = b.cells[columnIndex].textContent.trim();
        return isNaN(cellA) ? cellA.localeCompare(cellB) : cellA - cellB;
    });

    sortedRows.forEach(row => table.appendChild(row));
}
