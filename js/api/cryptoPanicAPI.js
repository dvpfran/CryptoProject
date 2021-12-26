// API para obter notícias das moedas.
const url_cryptopanic = "http://cryptopanichelper.ddns.net/CryptoPanic";

/**
 * Fazer um pedido a API.
 * @param {string} param Endpoint do que se pretende pesquisar.
 * @return {JSON} Caso o pedido seja bem sucedido vai retornar um JSON caso contrário o valor será nulo.
 */
async function requestCryptoPanic(param) {
    let value = null;

    // o fetch é que vai fazer o pedido.
    // url - o que está declarado na primeira linha.
    // param - o valor que foi passado por parametro do queremos pesquisar.
    await fetch(`${url_cryptopanic}?${param}`, {
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
 * Vai fazer um pedido para obter as últimas notícias gerais.
 * @return {JSON} Caso o pedido seja bem sucedido vai retornar um JSON caso contrário o valor será nulo.
 */
async function getNews() {
    return await requestCryptoPanic("kind=news");
}

/**
 * Vai fazer um pedido para obter as notícias da moeda selecionada.
 * @param {string} symbol Símbolo da moeda selecionada. Exemplo: btc, eth.
 * @return {JSON} Caso o pedido seja bem sucedido vai retornar uma lista com as notícias relacionadas à moeda passada por parâmetro.
 */
async function getNewsBySymbolCoin(symbol) {
    return await requestCryptoPanic(`currencies=${symbol}`);
}