// Código para gerir o resutaldo de pesquisas.
let allCoins = [];

/**
 * Vai devolver uma lista conforme o que é escrito na caixa de texto.
 * @param {string} filter Fitro do que é pretendido ser pesquisado.
 */
async function getSearchResults(filter) {
    let coinsResult = [];

    // Se tiver vazio não vai fazer nada.
    if (filter != "") {
        filter = filter.toLowerCase();
        // Verifica se existe alguma moeda com o filtro.
        // Vai passar o filtro com todas as letras minúsculas.
        if (isFilterValid(filter)) {
            coinsResult = getFilteredCoins(filter);
        }
    }
    return coinsResult;
}

/**
 * Função para confirmar se o filtro existe na lista.
 * @param {string} filter Filtro da moeda a ser pesquisada.
 * @return {bool} Vai retornar verdadeiro se algum valor for encontrado.
 */
function isFilterValid(filter) {
    return allCoins.some(x =>
        x.id.toLowerCase().startsWith(filter) ||
        x.name.toLowerCase().startsWith(filter) ||
        x.symbol.toLowerCase().startsWith(filter));
}

/**
 * Função para retornar todas moedas com o filtro pasado por parâmetro.
 * @param {string} filter Filtro da moeda a ser pesquisada.
 * @return {JSON[]} Vai retornar uma lista JSON com todas as moedas encontradas.
 */
function getFilteredCoins(filter) {
    return allCoins.filter(x =>
        x.id.toLowerCase().startsWith(filter) ||
        x.name.toLowerCase().startsWith(filter) ||
        x.symbol.toLowerCase().startsWith(filter));
}

let intervalSearchBar;
let isKeyDown = false;
let countDifference = 0;
let actualWord = "";
let lastWord = "";
let canSearch = false;

function enableInterval() {
    intervalSearchBar = setInterval(() => {
        if (countDifference == 400 && !isKeyDown) {
            canSearch = true;
            fillDataList();
        }

        countDifference += 50;

    }, 100);
}

function disableInterval() {
    clearTimeout(intervalSearchBar);
}

function handlersBarraPesquisa() {
    let barraPesquisa = document.getElementById("barraPesquisa");

    barraPesquisa.addEventListener("keydown", async (e) => {
        isKeyDown = true;
        canSearch = false;
        countDifference = 0;
    });

    barraPesquisa.addEventListener("keyup", async (e) => {
        isKeyDown = false;
        actualWord = e.target.value;
    });

    barraPesquisa.addEventListener("focus", () => {
        enableInterval();
    });

    barraPesquisa.addEventListener("focusout", () => {
        disableInterval();
    });
}

async function fillDataList() {
    if (canSearch) {
        if (lastWord !== barraPesquisa.value) {
            let dataListOptions = document.getElementById("lista");
            dataListOptions.innerHTML = "";

            lastWord = barraPesquisa.value;

            let fragment = document.createDocumentFragment();
            let filteredCoins = await getSearchResults(actualWord);
    
            for (let index = 0; index < filteredCoins.length; index++) {
                let optionData = document.createElement("option");
                optionData.value = filteredCoins[index].id;
                optionData.innerHTML = filteredCoins[index].name;
                fragment.appendChild(optionData);
            }
            
            if (canSearch) {
                dataListOptions.append(fragment);
            }
        }
    }
}
