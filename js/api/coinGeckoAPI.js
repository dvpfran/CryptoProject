// link da API
const url = "https://api.coingecko.com/api/v3";

/**
 * Fazer um pedido a API.
 * @param {string} param Endpoint do que se pretende pesquisar.
 * @return {JSON} Caso o pedido seja bem sucedido vai retornar um JSON caso contrário o valor será nulo.
 */
async function request(param) {
    let value = null;

    // o fetch é que vai fazer o pedido.
    // url - o que está declarado na primeira linha.
    // param - o valor que foi passado por parametro do queremos pesquisar.
    await fetch(`${url}/${param}`, {
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
 * Pedido para obter a informação das moedas.
 * @param {number} quantity Número de moedas a pesquisar. Por defeito é 100.
 * @return {JSON} Caso o pedido seja bem sucedido vai retornar um JSON caso contrário o valor será nulo.
 */
function getCoins(quantity = 100) {
    return request(`coins?per_page=${quantity}`);
}

/**
 * Obter informação de uma moeda conforme o id passado por param.
 * @param {string} id Id da moeda.
 * @return {JSON} Caso o pedido seja bem sucedido vai retornar um JSON com a informação da moeda.
 */
function getCoin(id) {
    return request(`coins/${id}`);
}
