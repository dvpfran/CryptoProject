window.onload = async () => {
    isDarkModeAtive = getDarkModeFromLocalStorage();
    updateTheme();

    loadFavoriteCoinsFromLocalStorage();
    
    allCoins = await getAllCoins();
    let coins = await getCoins();
    fillCoinsTable(coins);
    // Depois de os dados serem carregados remove o spinner.
    document.getElementById("spinner-coins-table").remove();
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

function numberFormat(locale, currency, value) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
}
