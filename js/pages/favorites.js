let coins = [];

window.onload = async () => {
    isDarkModeAtive = getDarkModeFromLocalStorage();
    updateTheme();

    loadFavoriteCoinsFromLocalStorage();
    await getFavoriteCoins()
    dadosTabela(coins);
    Pesquisa(allCoins);
}

async function getFavoriteCoins(){

    for(index = 0; index < favoriteCoins.length; index++){
        coins[index] = await getCoin(favoriteCoins[index]);
    }
    
    coins.sort((a, b) => {
        return a.market_data.market_cap_rank - b.market_data.market_cap_rank;
    });  
}

