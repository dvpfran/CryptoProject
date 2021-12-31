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

/**
 * Adicionar um alerta à lista.
 * @param {number} id Id do alerta.
 * @param {string} coinId Id da moeda configurada para o alerta.
 * @param {number} minValue Valor mínimo da moeda para dispultar o alerta.
 * @param {number} maxValue Valor máximo da moeda para dispultar o alerta.
 * @param {bool} isDispatch Propriedade para verificar se o alerta já foi dispultado alguma vez.
 * @param {bool} isSeen  Propriedade para verificar se o alerta já foi visto pelo utilizador.
*/
function addAlert(id, coinId, minValue, maxValue) {
    // Carrega a lista no caso do array ainda não ter sido inicializado.
    if (!alerts) {
        loadAlertsFromLocalStorage();
    }

    alerts.push(new Alert(id, coinId, minValue, maxValue, false, false));
    saveAlertsToLocalStorage();
}


/**
 * Vai carregar os dados dos alertas configurados que estão no local storage.
 */
 function loadAlertsFromLocalStorage() {
    let stringAlerts = localStorage.getItem(ALERTS);
    if (stringAlerts != "") {
        // Converte a string do localStorage para um JSON.
        // Depois vai percorrer a lista para transformar cada JSON num Alert.
        let jsonAlerts = JSON.parse(stringAlerts);
        for (let index = 0; index < jsonAlerts.length; index++) {
            alerts.push(new Alert(jsonAlerts[index]));
        }
    }
}

/** 
 * Vai guardar a lista das configurações dos alertas no localStorage.
*/
function saveAlertsToLocalStorage() {
    let stringAlerts = JSON.stringify(alerts);
    localStorage.setItem(ALERTS, stringAlerts);
}
