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

function erase(element) {
    window.addEventListener("click", event => {
        event.preventDefault();

        let t = element.getBoundingClientRect();

        if(event.clientY >= t.top && event.clientY <= t.bottom && event.clientX >= t.left && event.clientX <= t.right) {
            erase(element);
            return;
        }
        element.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 100,
            fill: "forwards"
        });
        window.setTimeout(() => element.parentElement.removeChild(element), 100);
    }, { once: true });
}

function setTextbox(event) {
    textbox.style.position = "fixed";
    textbox.style.top = event.clientY+ "px";
    textbox.style.left = event.clientX + "px";
    textbox.style.display = "inline-block";

    textbox.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 100,
        fill: "forwards"
    });
    document.body.appendChild(textbox);
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
    <span id = "hack-tool-to-binary">To Binary</span>
    <span id = "hack-tool-from-binary">From Binary</span>
    <span id = "hack-tool-to-b64">To Base64</span>
    <span id = "hack-tool-from-b64">From Base64</span>
    <span id = "hack-tool-latin">Pig Latin</span>
    <span id = "hack-tool-base">Base</span>
    <span id = "hack-tool-real-contextmenu">Context Menu</span>
`;

const caesarCipher = contextmenu.querySelector("#hack-tool-caesar");
const toBinary = contextmenu.querySelector("#hack-tool-to-binary");
const fromBinary = contextmenu.querySelector("#hack-tool-from-binary");
const toB64 = contextmenu.querySelector("#hack-tool-to-b64");
const fromB64 = contextmenu.querySelector("#hack-tool-from-b64");
const pigLatin = contextmenu.querySelector("#hack-tool-latin");
const base = contextmenu.querySelector("#hack-tool-base");
const realContextmenu = contextmenu.querySelector("#hack-tool-real-contextmenu");

window.addEventListener("contextmenu", event => {
    text = getSelectionText();

    if(text) {
        event.preventDefault();
        contextmenu.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 100,
            fill: "forwards"
        });
        document.body.appendChild(contextmenu);
    
        contextmenu.style.position = "fixed";
        contextmenu.style.top = event.clientY+ "px";
        contextmenu.style.left = event.clientX + "px";
        contextmenu.style.display = "inline-block";

        window.addEventListener("click", event => {
            event.preventDefault();

            contextmenu.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 100,
                fill: "forwards"
            });
            window.setTimeout(() => contextmenu.parentElement.removeChild(contextmenu), 100);
        }, { once: true });
    }
});

const textbox = document.createElement("div");
textbox.id = "hack-tool-textbox";

caesarCipher.addEventListener("click", event => {
    textbox.innerHTML = `
        <div id = "hack-tool-output">${text}</div>
        <input type = "number" id = "hack-tool-input">
    `;

    setTextbox(event);

    let input = textbox.querySelector("#hack-tool-input");
    let output = textbox.querySelector("#hack-tool-output");

    input.onkeyup = input.onchange = input.oninput = event => {
        output.textContent = caesar(text, input.value ? Number(input.value) : 0);
    }

    setTimeout(() => erase(textbox), 100);
});

toBinary.addEventListener("click", event => {
    textbox.innerHTML = `
        <div id = "hack-tool-output">${text}</div>
    `;

    setTextbox(event);

    let output = textbox.querySelector("#hack-tool-output");

    output.textContent = text.split("").map(v => "0" + v.charCodeAt(0).toString(2)).join(" ");

    setTimeout(() => erase(textbox), 100);
});

fromBinary.addEventListener("click", event => {
    textbox.innerHTML = `
        <div id = "hack-tool-output">${text}</div>
    `;

    setTextbox(event);

    let output = textbox.querySelector("#hack-tool-output");

    output.textContent = text.split(" ").map(v => String.fromCharCode(parseInt(v, 2))).join("");

    setTimeout(() => erase(textbox), 100);
});

toB64.addEventListener("click", event => {
    textbox.innerHTML = `
        <div id = "hack-tool-output">${text}</div>
    `;

    setTextbox(event);

    let output = textbox.querySelector("#hack-tool-output");

    output.textContent = btoa(text);

    setTimeout(() => erase(textbox), 100);
});

fromB64.addEventListener("click", event => {
    textbox.innerHTML = `
        <div id = "hack-tool-output">${text}</div>
    `;

    setTextbox(event);

    let output = textbox.querySelector("#hack-tool-output");

    output.textContent = atob(text);

    setTimeout(() => erase(textbox), 100);
});

pigLatin.addEventListener("click", event => {
    textbox.innerHTML = `
        <div id = "hack-tool-ouput">${text.split(" ").map(v => {
            let start = v.match(/^[^aeiouy]+/);

            if(!start) return v + "ay";

            return v.substring(start[0].length) + start[0] + "ay";
        }).join(" ")}</div>
    `;

    setTextbox(event);

    setTimeout(() => erase(textbox), 100);
});

base.addEventListener("click", event => {
    textbox.innerHTML = `
        <div id = "hack-tool-output">${text}</div>
        <input type = "number" min = "2" max = "36" id = "hack-tool-from" value = "10">
        <input type = "number" min = "2" max = "36" id = "hack-tool-to" value = "10">
    `;

    setTextbox(event);

    let output = textbox.querySelector("#hack-tool-output");
    let from = textbox.querySelector("#hack-tool-from");
    let to = textbox.querySelector("#hack-tool-to");

    from.onkeyup = from.onchange = from.oninput = to.onkeyup = to.onchange = to.oninput = event => {
        let f = Number(from.value);
        let t = Number(to.value);
        output.textContent = f === 10 ? Number(text).toString(t) : (to === 10 ? parseInt(text, f) : parseInt(text, f).toString(t));
    }

    setTimeout(() => erase(textbox), 100);
});


realContextmenu.addEventListener("contextmenu", event => {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
});