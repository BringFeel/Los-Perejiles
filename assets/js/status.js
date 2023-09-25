document.addEventListener("DOMContentLoaded", () => {
    const serverTable = document.getElementById("serverTable").getElementsByTagName("tbody")[0];
    const loadingRow = serverTable.insertRow();
    const loadingCell = loadingRow.insertCell(0);
    loadingCell.colSpan = 5;
    loadingCell.textContent = "Solicitando datos a la API...";

    fetch("https://2f27-190-13-233-233.ngrok-free.app/servers") 
    .then(response => response.json())
        .then(data => {
            serverTable.removeChild(loadingRow); // Eliminar la fila de carga

            let totalOnlinePlayers = 0; // Variable para almacenar el total de jugadores en línea
            
            data.forEach(server => {
                const lastupdate = document.getElementById('lastupdate');
                lastupdate.textContent = server.lastUpdateTime;

                const row = serverTable.insertRow();
                
                row.insertCell(0).textContent = server.name;
                row.insertCell(1).textContent = server.type;
                row.insertCell(2).textContent = server.playersOnline + "/" + server.maxPlayers;
                row.insertCell(3).textContent = server.map;
                var statusinfo = row.insertCell(4);
                statusinfo.textContent = server.online ? "🟢" : "🔴"
                var statusTitle = server.online ? "Server Online" : "Server Offline";
                statusinfo.setAttribute("title", statusTitle);
                
                totalOnlinePlayers += server.playersOnline; // Sumar jugadores en línea de este servidor al total
            });

            // Agregar una fila para mostrar el total de jugadores en línea
            const totalRow = serverTable.insertRow();
            const totalCell = totalRow.insertCell(0);
            totalCell.colSpan = 5;
            totalCell.textContent = "Jugadores Totales en línea: " + totalOnlinePlayers;
        })
        .catch(error => console.error("Error fetching data:", error));
});
