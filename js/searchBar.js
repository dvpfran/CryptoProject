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

/**
 * Visto que são muitos registos, foi criado um timer para
 * não estar sempre a atualizar a datalist.
 * No firefox não seria necessário mas no chrome e edge
 * ficava muito lento.
*/
function enableTimer() {
    intervalSearchBar = setInterval(() => {
        if (countDifference == 400 && !isKeyDown) {
            canSearch = true;
            fillDataList();
        }

        countDifference += 50;
    }, 100);
}

function disableTimer() {
    clearTimeout(intervalSearchBar);
}

function handlersBarraPesquisa() {
    let barraPesquisa = document.getElementById("barraPesquisa");

    barraPesquisa.addEventListener("keydown", async (e) => {
        // Sempre que uma tecla é pressionada reseta o contador de pesquisa.
        isKeyDown = true;
        canSearch = false;
        countDifference = 0;
    });

    barraPesquisa.addEventListener("keyup", async (e) => {
        isKeyDown = false;
        actualWord = e.target.value;

        if (e.key === "Enter" && barraPesquisa.value != "") {
            const searchCoin = allCoins.filter(x => 
                x.id == barraPesquisa.value || 
                x.symbol == barraPesquisa.value || 
                x.name == barraPesquisa.value);
            
            if (searchCoin.length > 0)    {
                    window.open(`details.html?moeda=${searchCoin[0].id}`);
            }
            else {
                alert("A moeda introduzida não é válida");
            }
        }

    });

    barraPesquisa.addEventListener("focus", () => {
        enableTimer();
    });

    barraPesquisa.addEventListener("focusout", () => {
        disableTimer();
    });
}

async function fillDataList() {
    if (canSearch) {
        // Verifica se a palavra da última pesquisa não é igual a atual.
        if (lastWord !== barraPesquisa.value) {
            let dataListOptions = document.getElementById("lista");
            dataListOptions.innerHTML = "";

            lastWord = barraPesquisa.value;

            // Foi criado um documentFragment para não estar a atualizar a datalist diretamente.
            let fragment = document.createDocumentFragment();
            let filteredCoins = await getSearchResults(actualWord);
    
            for (let index = 0; index < filteredCoins.length; index++) {
                let optionData = document.createElement("option");
                optionData.value = filteredCoins[index].id;
                optionData.innerHTML = filteredCoins[index].name;
                fragment.appendChild(optionData);
            }
            
            // Condição só para garantir que o canSearch ainda está a true
            // pois pode ter havido uma nova pesquisa enquanto a lista de 
            // options era adicionada ao document fragment.
            if (canSearch) {
                dataListOptions.append(fragment);
            }
        }
    }
}
