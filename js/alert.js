// Código para gerir alertas conforme o preço da moeda.
const ALERTS = "ALERTS";

/**
 * Class Alert com todas as propriedades necessárias.
 * @param {number} id Id do alerta.
 * @param {string} coinId Id da moeda configurada para o alerta.
 * @param {number} minValue Valor mínimo da moeda para dispultar o alerta.
 * @param {number} maxValue Valor máximo da moeda para dispultar o alerta.
*/
class Alert {
    constructor(id, coinId, minValue, maxValue) {
        this.id = id;
        this.coinId = coinId;
        this.minValue = minValue;
        this.maxValue = maxValue;
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
 * @return {boolean} Se for guardado com sucesso retorna verdadeiro.
*/
function saveAlert(id, coinId, minValue, maxValue) {
    // Carrega a lista no caso do array ainda não ter sido inicializado.
    if (!alerts) {
        loadAlertsFromLocalStorage();
    }
    
    let alert = new Alert(id, coinId, minValue, maxValue, false, false);
    if (isAlertValid(alert)) {
        alerts.push(alert);
        saveAlertsToLocalStorage();
        return true;
    }
    return false;
}

/**
 * Verifica se o alerta passdo por parâmetro é válido.
 * @param {Alert} alert
 * @return {bool} Vai retornar falso se o valor mínimo for maior que o valor máximo.
 * @return {bool} Vai retornar falso se já existir uma alerta com as configurações iguais.
 */
function isAlertValid(alert) {
    if (alert.minValue > alert.maxValue || (alert.minValue == 0 && alert.maxValue == 0))
        return false;

    if (alerts.some(x =>
        x.coinId == alert.coinId && 
        x.minValue == alert.minValue && 
        x.maxValue == alert.maxValue)) {
            return false;
        }

    return true;
}

/**
 * Vai remover um alerta conforme o Id passado por parâmetro.
 * @param {number} id Id do alerta.
 */
function removeAlert(id, coinId) {
    if (!alerts) {
        loadAlertsFromLocalStorage();
    }

    // No do id passado por parâmetro existir
    // O valor do index vai ser diferente de -1.
    let indexAlert = alerts.indexOf(alerts.find(x => x.id == id && x.coinId == coinId));
    if (indexAlert != -1) {
        alerts.splice(indexAlert, 1);
        saveAlertsToLocalStorage();
    }
}

/**
 * Vai carregar os dados dos alertas configurados que estão no local storage.
 */
function loadAlertsFromLocalStorage() {
    let stringAlerts = localStorage.getItem(ALERTS);
    if (stringAlerts != "") {
        alerts = [];
        // Converte a string do localStorage para um JSON.
        // Depois vai percorrer a lista para transformar cada JSON num Alert.
        let jsonAlerts = JSON.parse(stringAlerts);
        if (jsonAlerts != "" && jsonAlerts != null){
            for (let index = 0; index < jsonAlerts.length; index++) {
                alerts.push(new Alert(
                    jsonAlerts[index].id,
                    jsonAlerts[index].coinId,
                    jsonAlerts[index].minValue,
                    jsonAlerts[index].maxValue,
                ));
            }
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

/**
 * Retorna o valor de todos os alertas do parâmetro filtrado.
 * @return {Alert[]}
 */
function getAlertsByCoinId(coinId) {
    return alerts.filter(x => x.coinId == coinId);
}