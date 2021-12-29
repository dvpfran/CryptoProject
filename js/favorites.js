// Código para moedas favoritas.

let favoriteCoins = [];

/**
 * Vai adicionar a moeda passada por parâmetro nos favoritos.
 * @param {string} coinId Id da moeda a adicionar aos favoritos.
 */
function addToFavorites(coinId) {
    // Só adiciona a moeda à lista caso ela não exista.
    if (!favoriteCoins.includes(coinId)) {
        favoriteCoins.push(coinId);
    }
}

/**
 * Vai remover a moeda passada por parâmetro dos favoritos.
 * @param {string} coinId Id da moeda a remover dos favoritos.
 */
function removeFromFavorites(coinId) {
    // Verifica se a moeda existe na lista para ser removida.
    if (favoriteCoins.includes(coinId)) {
        let indexCoin = favoriteCoins.indexOf(coinId);
        favoriteCoins.splice(indexCoin, 1);
    }
}
