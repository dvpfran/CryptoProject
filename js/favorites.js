// Código para moedas favoritas.
const FAVORITE_COINS = "FAVORITE_COINS";
let favoriteCoins = [];

/**
 * Vai adicionar a moeda passada por parâmetro nos favoritos.
 * @param {string} coinId Id da moeda a adicionar aos favoritos.
 */
function addToFavorites(coinId) {
    // Vai carregar a lista no caso do array ainda não ter sido iniciado.
    if (favoriteCoins.length == 0) {
        loadFavoriteCoinsFromLocalStorage();
    }

    // Só adiciona a moeda à lista caso ela não exista.
    if (!favoriteCoins.includes(coinId)) {
        favoriteCoins.push(coinId);
        saveToLocalStorage();
    }
}

/**
 * Vai remover a moeda passada por parâmetro dos favoritos.
 * @param {string} coinId Id da moeda a remover dos favoritos.
 */
function removeFromFavorites(coinId) {
    // Vai carregar a lista no caso do array ainda não ter sido iniciado.
    if (favoriteCoins.length == 0) {
        loadFavoriteCoinsFromLocalStorage();
    }

    // Verifica se a moeda existe na lista para ser removida.
    if (favoriteCoins.includes(coinId)) {
        let indexCoin = favoriteCoins.indexOf(coinId);
        favoriteCoins.splice(indexCoin, 1);
        saveToLocalStorage();
    }
}


/**
 * Vai carregar a lista de todas as moedas favoritas que estão no local storage.
 */
function loadFavoriteCoinsFromLocalStorage() {
    let stringFavoriteCoins = localStorage.getItem(FAVORITE_COINS);
    // Verifica se o localStorage não está vazio.
    if (stringFavoriteCoins != "") {
        favoriteCoins = JSON.parse(stringFavoriteCoins);
    }
}

/**
 * Vai converter a lista para uma string e depois guarda no local storage.
 */
function saveToLocalStorage() {
    let stringFavoriteCoins = JSON.stringify(favoriteCoins);
    localStorage.setItem(FAVORITE_COINS, stringFavoriteCoins);
}
