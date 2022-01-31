let converters;

window.onload = async () => {
    const moeda = await getCoin(buscarMoedaSelecionada());
    mostrarMoeda(moeda);
    fillConvertersList(moeda);

    const news = await getNewsBySymbolCoin(moeda.symbol);
    console.log(news);
    fillNews(news);
}

function mostrarMoeda(moeda) {
    document.getElementById("details-coin-name").innerHTML = `${moeda.name} (${moeda.symbol.toUpperCase()})`;
    document.getElementById("details-coin-rank").innerHTML = `#${moeda.market_cap_rank} - `;
    document.getElementById("details-coin-img").src = moeda.image.small;
    document.getElementById("details-coin-current-price").innerHTML = `Current Price: ${numberFormat("en-US", "USD", moeda.market_data.current_price.usd)}`;
    document.getElementById("details-coin-min-price").innerHTML = `${numberFormat("en-US", "USD", moeda.market_data.low_24h.usd)}`;
    document.getElementById("details-coin-max-price").innerHTML = `${numberFormat("en-US", "USD", moeda.market_data.high_24h.usd)}`;
    document.getElementById("selected-coin-symbol").innerHTML = moeda.symbol.toUpperCase();
    let elmPriceChange = document.getElementById("details-coin-price-percentage");
    const priceChangePercentage = moeda.market_data.price_change_percentage_24h.toFixed(2);
    elmPriceChange.innerHTML = `${priceChangePercentage}%`;
    elmPriceChange.className = priceChangePercentage > 0 ? "positive-number" : "negative-number";
}

function buscarMoedaSelecionada() {
    const paramsUrl = new URLSearchParams(window.location.search);
    return paramsUrl.get("moeda");
}

function fillConvertersList(moeda) {
    let elmConverters = document.getElementById("list-converters");
    converters = moeda.market_data.current_price;

    Object.entries(moeda.market_data.current_price).forEach(moeda => {
        // moeda[0] = symbol
        // moeda[1] = price
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.className = "dropdown-item";
        a.href = "#";
        a.innerHTML = moeda[0].toUpperCase();
        li.appendChild(a);
        li.addEventListener("click", () => {
            document.getElementById("btn-coin2-symbol-converter").innerHTML = moeda[0].toUpperCase();
            document.getElementById("selected-coin2-price").value = moeda[1];

        });
        elmConverters.appendChild(li);
        if (moeda[0] === "usd") {
            setPriceConverter(moeda[1]);
        }
    });
}

function numberFormat(locale, currency, value) {
    return new Intl.NumberFormat(locale,
        {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
}

function updateQuantityConverter() {
    const actualQuantity = getActualQuantityConverter();
    const definedPrice = converters[document.getElementById("btn-coin2-symbol-converter").innerHTML.toLowerCase()];
    const actualPrice = getActualPriceConverter();

    if (isConverterValueValid(actualQuantity, actualPrice)) {
        setQuantityConverter(actualQuantity * actualPrice / definedPrice);
    }
}

function updatePriceConverter() {
    const actualQuantity = getActualQuantityConverter();
    const definedPrice = converters[document.getElementById("btn-coin2-symbol-converter").innerHTML.toLowerCase()];

    if (isConverterValueValid(actualQuantity, definedPrice)) {
        if (definedPrice >= 1) {
            setPriceConverter(definedPrice * actualQuantity);
        }
    }
}

function getActualQuantityConverter() {
    return document.getElementById("quantity-coin-converter").value;
}

function getActualPriceConverter() {
    return document.getElementById("selected-coin2-price").value;
}

function isConverterValueValid(actualQuantity, actualPrice) {
    return !isNaN(actualQuantity) && !isNaN(actualPrice);
}

function setQuantityConverter(quantity) {
    document.getElementById("quantity-coin-converter").value = quantity;
}

function setPriceConverter(price) {
    document.getElementById("selected-coin2-price").value = price;
}

function fillNews(news) {
    let row = document.getElementById("details-news");

    for (let index = 0; index < news.results.length; index++) {
        let divCard = document.createElement("div");
        divCard.className = "card content-details mt-2 mb-2";
        divCard.style.maxWidth = "16rem";

        let divTitulo = document.createElement("div");
        divTitulo.className = "card-header fw-bold";
        divTitulo.innerHTML = news.results[index].title;

        let divCardBody = document.createElement("div");
        divCardBody.className = "card-body";

        let linkNew = document.createElement("a");
        linkNew.className = "text-warning d-block text-end";
        linkNew.href = news.results[index].url;
        linkNew.innerHTML = "Abrir";
        linkNew.target = "blank";

        let pText = document.createElement("p");
        pText.className = "card-title text-end";
        pText.innerHTML = news.results[index].published_at;

        divCardBody.append(pText, linkNew);

        divCard.append(divTitulo, divCardBody);
        row.append(divCard);
    }
}