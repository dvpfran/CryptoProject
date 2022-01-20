window.onload = async () => {
    loadFavoriteCoinsFromLocalStorage();
    allCoins = await getAllCoins();
    let coins = await getCoins();
    dadosTabela(coins);
    Pesquisa(allCoins);
}

function Pesquisa(allCoins) {
    let lista = document.getElementById("lista");

    document.getElementById("barraPesquisa").addEventListener("keyup", async (e) => {

        let dataListOptions = document.getElementById("lista");
        dataListOptions.innerHTML = "";

        let filteredCoins = await getSearchResults(e);

        for (let index = 0; index < filteredCoins.length; index++) {

            setTimeout(() => {
                let optionData = document.createElement("option");
                optionData.value = filteredCoins[index].id;
                optionData.innerHTML = filteredCoins[index].name;
                dataListOptions.append(optionData);
            }, 20);
        }
    });
}

function dadosTabela(coins) {
    let tabela = document.getElementById("Dados");

    for (let index = 0; index < coins.length; index++) {

        let trData = document.createElement("tr");
        trData.innerHTML = "";
        let tdRank = document.createElement("td");
        tdRank.innerHTML = coins[index].market_data.market_cap_rank;
        let tdCoin = document.createElement("td");
        tdCoin.innerHTML = coins[index].name;
        let tdPrice = document.createElement("td");
        tdPrice.innerHTML = coins[index].market_data.current_price.usd;
        let tdHours = document.createElement("td");
        tdHours.innerHTML = `<button onClick=Favoritos('${coins[index].id}')>fav</button></td>`;

        tabela.append(trData);
        trData.append(tdRank, tdCoin, tdPrice, tdHours);

    }
}

function Favoritos(coinId) {
    if (favoriteCoins.includes(coinId)) {
        removeFromFavorites(coinId);
    }
    else {
        addToFavorites(coinId);
    }
}