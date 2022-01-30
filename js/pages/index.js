window.onload = async () => {
    isDarkModeAtive = getDarkModeFromLocalStorage();
    updateTheme();

    loadFavoriteCoinsFromLocalStorage();
    
    let coins = await getCoins();
    fillCoinsTable(coins);

    // Depois de os dados serem carregados remove o spinner.
    document.getElementById("spinner-coins-table").remove();

    allCoins = await getAllCoins();
    handlersBarraPesquisa();
}

function numberFormat(locale, currency, value) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
}
