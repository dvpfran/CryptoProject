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
    sortTable();
    allCoins = await getAllCoins();
    handlersBarraPesquisa();
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
