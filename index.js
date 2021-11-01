const alphabet = "abcdefghijklmnopqrstuvwxyz";

String.prototype.map = function(func) {
    return this.split("").map(func).join("");
};

function caesar(string, cipher) {
    return string.map(v => alphabet.indexOf(v) + 1 ? (alphabet[(alphabet.indexOf(v) + cipher) % alphabet.length])[v.toLowerCase() === v ? "toLowerCase" : "toUpperCase"]() : v);
}

String.prototype.caesar = function(cipher) {
    return caesar(this, cipher);
};

Math.factorial = function(number) {
    let toReturn = number;
    while(number > 1) {
        number--;
        toReturn *= number;
    }
    return toReturn;
}

function getSelectionText() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

const contextmenu = document.createElement("div");
contextmenu.id = "hack-tool-contextmenu"

contextmenu.innerHTML = `
    <span>Caesar Cipher</span>
    <span>Binary</span>
    <span>Pig Latin</span>
    <span>Context Menu</span>
`;

window.addEventListener("contextmenu", event => {
    let text = getSelectionText();

    if(text) {
        event.preventDefault();
        document.body.appendChild(contextmenu);

        contextmenu.style.position = "fixed";
        contextmenu.style.top = event.clientY+ "px";
        contextmenu.style.left = event.clientX + "px";
        contextmenu.style.display = "inline-block";

        window.addEventListener("click", event => {
            event.preventDefault();

            document.body.removeChild(contextmenu);
        }, { once: true });
    }
})