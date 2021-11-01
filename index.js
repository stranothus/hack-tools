const alphabet = "abcdefghijklmnopqrstuvwxyz";

String.prototype.map = function(func) {
    return this.split("").map(func).join("");
};
