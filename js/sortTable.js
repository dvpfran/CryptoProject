function sortTableByColumn(table, column, asc = true) {
    let direction = asc ? 1 : -1;
    let tBody = table.tBodies[0];
    let rows = Array.from(tBody.querySelectorAll("tr"));
    let sortedRows;
    
    //Organiza cada linha
    if (column == 1) {
        sortedRows = rows.sort((a, b) => {
            let aColumnText = a.querySelector(`td:nth-child(${column + 1}) .name-coin-table`).textContent.trim().toLowerCase();
            let bColumnText = b.querySelector(`td:nth-child(${column + 1}) .name-coin-table`).textContent.trim().toLowerCase();

            return aColumnText > bColumnText ? (1 * direction) : (-1 * direction);
        });
    }
    else {
        sortedRows = rows.sort((a, b) => {
            let aColumnPrice = parseFloat(a.querySelector(`td:nth-child(${column + 1})`).textContent.replace('$', '').replace(',', ''));
            let bColumnPrice = parseFloat(b.querySelector(`td:nth-child(${column + 1})`).textContent.replace('$', '').replace(',', ''));

            return aColumnPrice > bColumnPrice ? (1 * direction) : (-1 * direction);
        });
    }

    //Elimina todas as linhas da tabela
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    //Adiciona todas as linhas filtradas
    tBody.append(...sortedRows);

    //Adicionar class conforme a ordem 
    table.querySelectorAll("th").forEach(th => th.classList.remove("order-asc", "order-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("order-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("order-desc", !asc);
}

function sortTable() {

    document.querySelectorAll(".table-sortable th").forEach(headerCell => {
        headerCell.addEventListener("click", () => {
            let tableElement = headerCell.parentElement.parentElement.parentElement;
            let headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            let currentIsAscending = headerCell.classList.contains("order-asc");

            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    });

}
