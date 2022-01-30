window.onload = async () => {
    isDarkModeAtive = getDarkModeFromLocalStorage();
    updateTheme();

    loadFavoriteCoinsFromLocalStorage();
    let coins = await getFavoriteCoins();

    fillCoinsTable(coins);
    if (coins.length > 0) {
        fillCoinsTable(coins);
    }
    else {
        document.getElementById("warning-favorites-coins").style.visibility = "visible";
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

