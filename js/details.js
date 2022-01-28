function mostrarMoeda(moeda) {

    document.getElementById("titulo-moeda").innerHTML = moeda.name
    document.getElementById("simboloMoeda").innerHTML = moeda.symbol
    document.getElementById("idMoeda").innerHTML = moeda.id
    document.getElementById("imgMoeda").src = moeda.image.small
    
}
async function buscarMoeda(){
    
    var moeda = await getCoin(buscarMoedaSelecionada());
    console.log("O que é que vais trazer? :    ", moeda);
   
   mostrarMoeda(moeda);
}

buscarMoeda();

function buscarMoedaSelecionada(){
    const paramsUrl = new URLSearchParams(window.location.search);

    return paramsUrl.get("moeda");
}