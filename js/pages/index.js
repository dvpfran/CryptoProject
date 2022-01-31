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
    
    loadAlertsFromLocalStorage();

    if (alerts.length > 0) {
        for(let index = 0; index < alerts.length; index++) {
            const coin = await getCoin(alerts[index].coinId);
            if (coin != undefined) {
                console.log(alerts[index].minValue);
                console.log(alerts[index].maxValue);
                console.log(coin.market_data.current_price.usd);
                if (parseFloat(coin.market_data.current_price.usd) >= alerts[index].minValue && parseFloat(coin.market_data.current_price.usd) <= alerts[index].maxValue) {
                    const toast = createToast("", "success", "Moeda antigiu certo valor.", `A moeda ${coin.name} antigiu o valor entre ${alerts[index].minValue} e ${alerts[index].maxValue}`);
                    document.getElementById("content-toast").append(toast);
                }
            }
        }
    }
}

function numberFormat(locale, currency, value) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
}
