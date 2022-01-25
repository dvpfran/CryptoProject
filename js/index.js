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

    console.log(coins[0]);

    for (let index = 0; index < coins.length; index++) {
        const coinId = coins[index].id;       
        
        let trData = document.createElement("tr");
        let tdRank = document.createElement("td");
        
        const srcImgFavorite = favoriteCoins.includes(coinId) ? ICON_STAR_FILL : ICON_STAR;
        let imgFavorite = createImage(`favorite-${coinId}-table`, "favorite-coin-table",  srcImgFavorite, "");
        imgFavorite.addEventListener("click", () => favoritos(coinId), false);
        tdRank.append(imgFavorite, coins[index].market_data.market_cap_rank);

        let tdCoin = document.createElement("td");
        const img = createImage(`id-coin-${coinId}`, "icon-coin-table", coins[index].image.small, coins[index].symbol);
        const spanSymbol = createSpan("", "symbol-coin-table", coins[index].symbol);
        const spanName = createSpan("", "name-coin-table", coins[index].name);
        tdCoin.append(img, spanSymbol, spanName);
        
        let tdPrice = document.createElement("td");
        
        tdPrice.innerHTML = numberFormat("en-US", "USD", coins[index].market_data.current_price.usd);
        
        let td24Hours = document.createElement("td");
        const priceChangePercentage24 = coins[index].market_data.price_change_percentage_24h.toFixed(2);
        td24Hours.innerHTML = priceChangePercentage24 > 0 ? `+${priceChangePercentage24}` : `${priceChangePercentage24}`;
        td24Hours.className = priceChangePercentage24 > 0 ? "positive-number" : "negative-number";

        let tdHight24hours = document.createElement("td");
        tdHight24hours.innerHTML = numberFormat("en-US", "USD", coins[index].market_data.high_24h.usd);
        
        let tdLow24hours = document.createElement("td");
        tdLow24hours.innerHTML = numberFormat("en-US", "USD", coins[index].market_data.low_24h.usd);

        let tdMarketCap = document.createElement("td");
        tdMarketCap.innerHTML = numberFormat("en-US", "USD", coins[index].market_data.market_cap.usd);


        tabela.append(trData);
        trData.append(tdRank, tdCoin, tdPrice, td24Hours, tdHight24hours, tdLow24hours, tdMarketCap);
    }

    // Depois de os dados serem carregados remove o spinner.
    document.getElementById("spinner-coins-table").remove();
}

function favoritos(coinId) {
    let srcImg = "";
    if (favoriteCoins.includes(coinId)) {
        removeFromFavorites(coinId);
        srcImg = ICON_STAR;
    }
    else {
        addToFavorites(coinId);
        srcImg = ICON_STAR_FILL;
    }

    document.getElementById(`favorite-${coinId}-table`).src = srcImg;
}

function numberFormat(locale, currency, value) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
}
