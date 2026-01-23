const display = document.getElementById("display");
const operator = ["+", "-", "*", "/", "."];

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value) // ? 
    } catch {
        display.value = "Error";
    }
}