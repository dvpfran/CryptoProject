// Código para gerir alertas conforme o preço da moeda.
const ALERTS = "ALERTS";

/**
 * Class Alert com todas as propriedades necessárias.
 * @param {number} id Id do alerta.
 * @param {string} coinId Id da moeda configurada para o alerta.
 * @param {number} minValue Valor mínimo da moeda para dispultar o alerta.
 * @param {number} maxValue Valor máximo da moeda para dispultar o alerta.
 * @param {bool} isDispatch Propriedade para verificar se o alerta já foi dispultado alguma vez.
 * @param {bool} isSeen  Propriedade para verificar se o alerta já foi visto pelo utilizador.
*/
class Alert {
    constructor(id, coinId, minValue, maxValue, isDispatch, isSeen) {
        this.id = id;
        this.coinId = coinId;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.isDispatch = isDispatch;
        this.isSeen = isSeen;
    }
}

/**
 * Lista com todos os alertas configurados.
 */
let alerts = [];
