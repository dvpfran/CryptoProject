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

function createToast(id, toastType, title, text) {
    let bgToast = "";
    switch (toastType) {
        case "error":
            bgToast = "bg-danger";
            break;
        case "warning":
            bgToast = "bg-warning";
            break;
        case "success":
            bgToast = "bg-success";
            break;
    }

    let divToast = document.createElement("div");
    divToast.className = `toast ${bgToast} show`;
    divToast.style.zIndex = 1;
    divToast.setAttribute("role", "alert");
    divToast.setAttribute("aria-live", "assertive");
    divToast.setAttribute("aria-atomic", "true");

    let divToastHeader = document.createElement("div");
    divToastHeader.className = "toast-header";

    let strongTitle = document.createElement("strong");
    strongTitle.className ="me-auto";
    strongTitle.innerHTML = title;

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn-close";
    button.setAttribute("data-bs-dismiss", "toast");
    button.setAttribute("aria-label", "Close");

    divToastHeader.append(strongTitle, button);

    let divToastBody = document.createElement("div");
    divToastBody.className = "toast-body";
    divToastBody.innerHTML = text;
    divToast.style.color = "white";

    divToast.append(divToastHeader, divToastBody);

    return divToast;
}
