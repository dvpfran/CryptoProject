/**
 * Vai carregar a tabela das moedas com os respetivos dados.
 */
function fillCoinsTable(coins) {
    let tabela = document.getElementById("Dados");

    for (let index = 0; index < coins.length; index++) {
        const coinId = coins[index].id;       
        
        let trData = document.createElement("tr");

        let tdRank = document.createElement("td");
        const srcImgFavorite = favoriteCoins.includes(coinId) ? ICON_STAR_FILL : ICON_STAR;
        let imgFavorite = createImage(`favorite-${coinId}-table`, "favorite-coin-table",  srcImgFavorite, "");
        tdRank.addEventListener("click", () => favoritos(coinId), false);
        tdRank.append(imgFavorite, coins[index].market_data.market_cap_rank);

        let tdCoin = document.createElement("td");
        const img = createImage(`id-coin-${coinId}`, "icon-coin-table", coins[index].image.small, coins[index].symbol);
        const spanSymbol = createSpan("", "symbol-coin-table", coins[index].symbol);
        const spanName = createSpan("", "name-coin-table", coins[index].name);
        tdCoin.append(img, spanSymbol, spanName);
        tdCoin.addEventListener("click", () => openDetailsPage(coinId));

        let tdPrice = document.createElement("td");
        tdPrice.innerHTML = numberFormat("en-US", "USD", coins[index].market_data.current_price.usd);
        tdPrice.addEventListener("click", () => openDetailsPage(coinId));

        let td24Hours = document.createElement("td");
        const priceChangePercentage24 = coins[index].market_data.price_change_percentage_24h.toFixed(2);
        td24Hours.innerHTML = priceChangePercentage24 > 0 ? `+${priceChangePercentage24}` : `${priceChangePercentage24}`;
        td24Hours.className = priceChangePercentage24 > 0 ? "positive-number" : "negative-number";
        td24Hours.addEventListener("click", () => openDetailsPage(coinId));

        let tdHight24hours = document.createElement("td");
        tdHight24hours.innerHTML = numberFormat("en-US", "USD", coins[index].market_data.high_24h.usd);
        tdHight24hours.className = "d-none d-md-table-cell";
        tdHight24hours.addEventListener("click", () => openDetailsPage(coinId));

        let tdLow24hours = document.createElement("td");
        tdLow24hours.innerHTML = numberFormat("en-US", "USD", coins[index].market_data.low_24h.usd);
        tdLow24hours.className = "d-none d-md-table-cell";
        tdLow24hours.addEventListener("click", () => openDetailsPage(coinId));

        let tdMarketCap = document.createElement("td");
        tdMarketCap.innerHTML = numberFormat("en-US", "USD", coins[index].market_data.market_cap.usd);
        tdMarketCap.className = "d-none d-md-table-cell";
        tdMarketCap.addEventListener("click", () => openDetailsPage(coinId));

        tabela.append(trData);
        trData.append(tdRank, tdCoin, tdPrice, td24Hours, tdHight24hours, tdLow24hours, tdMarketCap);
    }
}

function numberFormat(locale, currency, value) {
    return new Intl.NumberFormat(locale, 
        { style: 'currency',
          currency: currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value);
}

function openDetailsPage(coinId) {
    window.open(`details.html?moeda=${coinId}`, "_self");
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