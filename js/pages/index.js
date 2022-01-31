window.onload = async () => {
    isDarkModeAtive = getDarkModeFromLocalStorage();
    updateTheme();

    loadFavoriteCoinsFromLocalStorage();
    
    let coins = await getCoins();
    fillCoinsTable(coins);

    // Depois de os dados serem carregados remove o spinner.
    document.getElementById("spinner-coins-table").remove();
    sortTable();
}

function Pesquisa(allCoins) {
    let lista = document.getElementById("lista");

    document.getElementById("barraPesquisa").addEventListener("keyup", async (e) => {

    allCoins = await getAllCoins();
    handlersBarraPesquisa();
    document.getElementById("barraPesquisa").focus();
}

function numberFormat(locale, currency, value) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
}
