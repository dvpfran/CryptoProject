let converters;
let coinIdDetails;

window.onload = async () => {
    const moeda = await getCoin(buscarMoedaSelecionada());
    if (!moeda?.error) {
        mostrarMoeda(moeda);
        
        coinIdDetails = moeda.id;
        loadFavoriteCoinsFromLocalStorage();
        checkFavoriteImage();

        allCoins = await getAllCoins();
        fillConvertersList(moeda);

        const news = await getNewsBySymbolCoin(moeda.symbol);
        fillNews(news);

        loadAlertsFromLocalStorage();
    }
    else {
        document.getElementById("details-content").remove();
        document.getElementById("warning-details-coin").style.visibility = "visible";
    }
    handlersBarraPesquisa();
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
        divCard.className = "card content-details mt-2 mb-2 col-sm-3";

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

function favoritos() {
    let srcImg = "";
    if (favoriteCoins.includes(coinIdDetails)) {
        removeFromFavorites(coinIdDetails);
        srcImg = ICON_STAR;
    }
    else {
        addToFavorites(coinIdDetails);
        srcImg = ICON_STAR_FILL;
    }

    document.getElementById("img-favorite-details").src = srcImg;
}

function checkFavoriteImage() {
    let srcImg = "";
    if (favoriteCoins.includes(coinIdDetails)) {
        srcImg = ICON_STAR_FILL;
    }
    else {
        srcImg = ICON_STAR;
    }
    document.getElementById("img-favorite-details").src = srcImg;
}

function addAlert() {
    const alerts = getAlertsByCoinId(coinIdDetails);
    const nextId = alerts.length > 0 ? alerts[alerts.length -1].id +1 : 1;

    let divAlert = createDiv(`alert-${nextId}`, "details-coins-alerts mt-2 d-flex")

    let divMinValue = createDiv("", "form-control-alert");
    let labelMin = createLabel("Valor mínimo");
    let inputMin = createInput(`alert-min-${nextId}`, "form-control", "number", 0);
    divMinValue.append(labelMin, inputMin);

    let divMaxValue = createDiv("", "form-control-alert");
    let labelMax = createLabel("Valor máximo:");
    let inputMax = createInput(`alert-max-${nextId}`, "form-control", "number", 0);
    divMaxValue.append(labelMax, inputMax);

    let divButtons = createDiv("", "ms-auto");
    let btnSave = createButton(`alert-save-${nextId}`,"button-alert button-save-alert", "Guardar");
    btnSave.addEventListener("click", () => {
        let toast;
        if (saveAlert(nextId, coinIdDetails, inputMin.value, inputMax.value)) {
            toast = createToast("", "success", "Alerta guardado", "O alerta foi guardado com sucesso")
        }
        else {
            toast = createToast("", "error", "Erro ao guardar alerta", "Os valores mínimo não pode ser que o valor máximo ou ambos os valores não podem ser 0.")
        }
        document.getElementById("content-toast").append(toast);
    });
    
    let btnRemove = createButton(`alert-remove-${nextId}`,"button-alert button-remove-alert", "Remover");
    
    btnRemove.addEventListener("click", () => {
        document.getElementById(`alert-${nextId}`).remove();
        removeAlert(nextId, coinIdDetails);
    });

    divButtons.append(btnSave, btnRemove);
    divAlert.append(divMinValue, divMaxValue, divButtons);
    document.getElementById("row-alerts").append(divAlert);
}
