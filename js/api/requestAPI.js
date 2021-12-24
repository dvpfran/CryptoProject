// link da API
const url = "https://api.coingecko.com/api/v3";

// Função que vai fazer um pedido a API.
// passar por param o que queremos pesquisar.
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
