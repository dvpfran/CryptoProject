const DARK_MODE = 'DARK_MODE';

let isDarkModeAtive = true;

/**
 * Ativar ou desativar o darkmode conforme o seu estado.
 */
function changeDarkMode() {
    isDarkModeAtive = !isDarkModeAtive;
    saveDarkModeToLocalStorage();
    updateTheme();
}

/**
 * Vai buscar o valor do darkmode ao localstorage.
 * @return {boolean}
 */
function getDarkModeFromLocalStorage() {
    const darkModeStorage = localStorage.getItem(DARK_MODE);

    // Confirma se existe alguma configuração no localstorage.
    // Se existir vai pegar no valor que está lá guardado.
    // Se não existir cria uma nova config no localstorage com o valor atual.
    if (darkModeStorage !== null) {
        return darkModeStorage;
    }
    else {
        saveDarkModeToLocalStorage();
    }
    return isDarkModeAtive;
}

/**
 * Vai guardar o estado do DarkMode no localstorage.
*/
function saveDarkModeToLocalStorage() {
    localStorage.setItem(DARK_MODE, isDarkModeAtive);
}

/**
 * Atualiza o tema conforme o estado do darkmode.
 */
function updateTheme() {
    let imgDarkMode = document.getElementById("img-darkmode");
    imgDarkMode.src = isDarkModeAtive === "true" ? ICON_MOON_YELLOW : ICON_MOON_BLACK;
}