function mostrarMoeda(moeda) {
    document.getElementById("details-coin-name").innerHTML = `${moeda.name} (${moeda.symbol.toUpperCase()})`;
    document.getElementById("details-coin-rank").innerHTML = `#${moeda.market_cap_rank} - `;
    document.getElementById("details-coin-img").src = moeda.image.small;
    document.getElementById("details-coin-current-price").innerHTML = `Current Price: ${numberFormat("en-US", "USD", moeda.market_data.current_price.usd)}`;
    document.getElementById("details-coin-min-price").innerHTML = `${numberFormat("en-US", "USD", moeda.market_data.low_24h.usd)}`;
    document.getElementById("details-coin-max-price").innerHTML = `${numberFormat("en-US", "USD", moeda.market_data.high_24h.usd)}`;
    let elmPriceChange = document.getElementById("details-coin-price-percentage");
    const priceChangePercentage = moeda.market_data.price_change_percentage_24h.toFixed(2);
    elmPriceChange.innerHTML = `${priceChangePercentage}%`;
    elmPriceChange.className = priceChangePercentage > 0 ? "positive-number" : "negative-number";
}
async function buscarMoeda(){
    var moeda = await getCoin(buscarMoedaSelecionada());
    console.log(moeda);
   mostrarMoeda(moeda);
}

buscarMoeda();

function buscarMoedaSelecionada(){
    const paramsUrl = new URLSearchParams(window.location.search);
    return paramsUrl.get("moeda");
}

function numberFormat(locale, currency, value) {
    return new Intl.NumberFormat(locale, 
        { style: 'currency', 
          currency: currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
}