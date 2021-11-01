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