window.onload = async () => {
    isDarkModeAtive = getDarkModeFromLocalStorage();
    updateTheme();

    loadFavoriteCoinsFromLocalStorage();
    let coins = await getFavoriteCoins();

    fillCoinsTable(coins);
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

