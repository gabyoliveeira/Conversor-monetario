"use strict";

const label_from_currency = document.getElementById('from_currency');
const label_from_ammount = document.getElementById('from_ammount');
const label_to_currency = document.getElementById('to_currency');
const label_to_ammount = document.getElementById('to_ammount');

const tax_info = document.getElementById('tax_info');
const swap = document.getElementById('swap');

label_from_currency.addEventListener('change', calculate);
label_from_ammount.addEventListener('input', calculate);
label_to_currency.addEventListener('change', calculate);
label_to_ammount.addEventListener('input', calculate);
swap.addEventListener('click', infoSwap);

main();

function main() {
    const currency = { "BRL": "Real", "EUR": "Euro", "USD": "Dollar" };
    const options = Object.entries(currency).map(([key, value]) => `<option value='${key}'>${value}</option>`).join('\n');
    label_from_currency.innerHTML = options;
    label_to_currency.innerHTML = options;
    calculate();
}

function infoSwap() {
    const temp = label_from_currency.value;
    label_from_currency.value = label_to_currency.value;
    label_to_currency.value = temp;
    calculate();
}

async function getURL(url) {
    const response = await fetch(url);
    return response.json();
}

function getInfoSelect(select) {
    return select.options[select.selectedIndex].text;
}

async function calculate() {
    const from = label_from_currency.value;
    const to = label_to_currency.value;
    const { rates } = await getURL(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const rate = rates[to];
    tax_info.innerText = `1 ${getInfoSelect(label_from_currency)} = ${rate} ${getInfoSelect(label_to_currency)}`;
    label_to_ammount.value = (label_from_ammount.value * rate).toFixed(2);
}

// Alternar entre modo claro e escuro
document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});