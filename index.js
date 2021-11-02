const alphabet = "abcdefghijklmnopqrstuvwxyz";
const vowels = "aeiou";

String.prototype.map = function(func) {
    return this.split("").map(func).join("");
};

function caesar(string, cipher) {
    return string.map(v => {
        let exists = alphabet.indexOf(v.toLowerCase()) + 1;

        if(!exists) return v;

        let index = alphabet.indexOf(v.toLowerCase());
        let newIndex = index + cipher;
        let limitedIndex = newIndex % alphabet.length;
        let newV = alphabet[limitedIndex];

        return newV[v.toLowerCase() === v ? "toLowerCase" : "toUpperCase"]();
    });
}

String.prototype.caesar = function(cipher) {
    return caesar(this, cipher);
};

function factorial(number) {
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

var text = "";

const contextmenu = document.createElement("div");
contextmenu.id = "hack-tool-contextmenu";

contextmenu.innerHTML = `
    <span id = "hack-tool-caesar">Caesar Cipher</span>
    <span id = "hack-tool-binary">Binary</span>
    <span id = "hack-tool-latin">Pig Latin</span>
    <span id = "hack-tool-real-contextmenu">Context Menu</span>
`;

const caesarCipher = contextmenu.querySelector("#hack-tool-caesar");
const binary = contextmenu.querySelector("#hack-tool-binary");
const pigLatin = contextmenu.querySelector("#hack-tool-latin");
const realContextmenu = contextmenu.querySelector("#hack-tool-real-contextmenu");

window.addEventListener("contextmenu", event => {
    text = getSelectionText();

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
});

const textbox = document.createElement("div");
textbox.id = "hack-tool-textbox";

caesarCipher.addEventListener("click", event => {
    textbox.innerHTML = `
        <div id = "hack-tool-ouput">${text}</div>
        <input type = "number" id = "hack-tool-input">
    `;

    textbox.style.position = "fixed";
    textbox.style.top = event.clientY+ "px";
    textbox.style.left = event.clientX + "px";
    textbox.style.display = "inline-block";

    document.body.appendChild(textbox);

    let input = textbox.querySelector("#hack-tool-input");
    let output = textbox.querySelector("#hack-tool-ouput");

    input.onkeyup = input.onchange = input.oninput = event => {
        output.textContent = caesar(text, input.value ? Number(input.value) : 0);
    }

    function erase() {
        window.addEventListener("click", event => {
            event.preventDefault();

            let t = textbox.getBoundingClientRect();

            if(event.clientY >= t.top && event.clientY <= t.bottom && event.clientX >= t.left && event.clientX <= t.right) {
                erase();
                return;
            }
            document.body.removeChild(textbox);
        }, { once: true });
    }

    setTimeout(erase, 100);
});

pigLatin.addEventListener("click", event => {
    textbox.innerHTML = `
        <div id = "hack-tool-ouput">${text.split(" ").map(v => (!(vowels.indexOf(v[0]) + 1) ? v.substring(1) + v[0].toLowerCase() : v) + "ay").join(" ")}</div>
    `;

    textbox.style.position = "fixed";
    textbox.style.top = event.clientY+ "px";
    textbox.style.left = event.clientX + "px";
    textbox.style.display = "inline-block";

    document.body.appendChild(textbox);

    function erase() {
        window.addEventListener("click", event => {
            event.preventDefault();

            let t = textbox.getBoundingClientRect();

            if(event.clientY >= t.top && event.clientY <= t.bottom && event.clientX >= t.left && event.clientX <= t.right) {
                erase();
                return;
            }
            document.body.removeChild(textbox);
        }, { once: true });
    }

    setTimeout(erase, 100);
});