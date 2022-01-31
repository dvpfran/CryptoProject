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

function createDiv(id, className) {
    let div = document.createElement("div");
    div.id = id;
    div.className = className;
    return div;
}

function createLabel(text) {
    let label = document.createElement("label");
    label.innerHTML = text;
    return label;
}

function createInput(id, className, type, value) {
    let input = document.createElement("input");
    input.id = id;
    input.className = className;
    input.type = type;
    input.value = value;
    return input;
}

function createButton(id, className, text) {
    let button = document.createElement("button");
    button.id = id;
    button.className = className;
    button.innerHTML = text;
    return button;
}
