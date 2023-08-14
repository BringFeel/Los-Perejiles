document.addEventListener("DOMContentLoaded", () => {
    const serverTable = document.getElementById("serverTable").getElementsByTagName("tbody")[0];
    const loadingRow = serverTable.insertRow();
    const loadingCell = loadingRow.insertCell(0);
    loadingCell.colSpan = 5;
    loadingCell.textContent = "Solicitando datos a la API...";

    fetch("https://4efd-190-13-241-208.ngrok-free.app/servers") // Reemplaza "URL_DE_TU_API_JSON" con la URL real de tu API
    .then(response => response.json())
        .then(data => {
            serverTable.removeChild(loadingRow); // Eliminar la fila de carga
            data.forEach(server => {
                const row = serverTable.insertRow();
                
                row.insertCell(0).textContent = server.name;
                row.insertCell(1).textContent = server.type;
                row.insertCell(2).textContent = server.playersOnline + "/" + server.maxPlayers;
                row.insertCell(3).textContent = server.online ? "🟢" : "🔴";
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
