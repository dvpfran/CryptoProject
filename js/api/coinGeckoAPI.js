// link da API
const urlCoinGecko = "https://api.coingecko.com/api/v3";

/**
 * Fazer um pedido a API.
 * @param {string} param Endpoint do que se pretende pesquisar.
 * @return {JSON} Caso o pedido seja bem sucedido vai retornar um JSON caso contrário o valor será nulo.
 */
async function requestCoinGecko(param) {
    let value = null;

    // o fetch é que vai fazer o pedido.
    // url - o que está declarado na primeira linha.
    // param - o valor que foi passado por parametro do queremos pesquisar.
    await fetch(`${urlCoinGecko}/${param}`, {
        // configurações do pedido.
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
    })
        .then(response => value = response.json()) // assim que o pedido acabar vai converter a resposta para json.
        .catch(error => console.log("error:", error)); // se der erro vai mostrar na consola.

    // vai retornar o valor da resposta.
    return value;
}

/**
 * Pedido para obter todas as moedas que a API pode retornar.
 * @return {JSON[]} Caso o pedido seja bem sucedido vai retornar uma lista com o [id], [name] e [symbol] de todas as moedas.
 */
async function getAllCoins() {
    return await requestCoinGecko("coins/list");
}

/**
 * Pedido para obter a informação das moedas.
 * @param {number} quantity Número de moedas a pesquisar. Por defeito é 100.
 * @return {JSON[]} Caso o pedido seja bem sucedido vai retornar um JSON caso contrário o valor será nulo.
 */
async function getCoins(quantity = 100) {
    return await requestCoinGecko(`coins?per_page=${quantity}`);
}

/**
 * Obter informação de uma moeda conforme o id passado por param.
 * @param {string} id Id da moeda.
 * @return {JSON[]} Caso o pedido seja bem sucedido vai retornar um JSON com a informação da moeda.
 */
async function getCoin(id) {
    return await requestCoinGecko(`coins/${id}`);
}
