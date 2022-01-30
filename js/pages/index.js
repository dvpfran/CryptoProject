window.onload = async () => {
    isDarkModeAtive = getDarkModeFromLocalStorage();
    updateTheme();

    loadFavoriteCoinsFromLocalStorage();
    
    allCoins = await getAllCoins();
    let coins = await getCoins();
    fillCoinsTable(coins);
    // Depois de os dados serem carregados remove o spinner.
    document.getElementById("spinner-coins-table").remove();
    handlersBarraPesquisa();
}

function numberFormat(locale, currency, value) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
}
