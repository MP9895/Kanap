import { getFromUrl } from "./tools.js";

const orderId = getFromUrl('orderId');

document.querySelector("#orderId").innerHTML = `<span id="orderId"><strong>${orderId}</strong><br>Merci pour votre commande!</span>`;

localStorage.clear();