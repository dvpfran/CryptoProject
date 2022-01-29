function createImage(id, className, src, alt) {
    let img = document.createElement("img");
    img.id = id;
    img.className = className;
    img.src = src;
    img.alt = alt;
    return img;
}

function createSpan(id, className, text) {
    let span = document.createElement("span");
    span.id = id;
    span.className = className;
    span.innerText = text;
    return span;
}
