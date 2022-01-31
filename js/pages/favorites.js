window.onload = async () => {
    isDarkModeAtive = getDarkModeFromLocalStorage();
    updateTheme();

    loadFavoriteCoinsFromLocalStorage();
    
    let coins = await getFavoriteCoins();
    if (coins.length > 0) {
        fillCoinsTable(coins);
    }
    else {
        document.getElementById("warning-favorites-coins").style.visibility = "visible";
    }
    
    // Depois de os dados serem carregados remove o spinner.
    document.getElementById("spinner-coins-table").remove();

    allCoins = await getAllCoins();
    handlersBarraPesquisa();
    
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

async function getFavoriteCoins(){
    let coins = [];
    for(index = 0; index < favoriteCoins.length; index++){
        coins.push(await getCoin(favoriteCoins[index]));
    }
    
    coins.sort((a, b) => {
        return a.market_data.market_cap_rank - b.market_data.market_cap_rank;
    });

    return coins;
}
