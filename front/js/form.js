import { get } from "./tools.js";

let form = document.querySelector(".cart__order__form");

form.addEventListener('submit', (e) => {

    e.preventDefault();
    const isFormValid = (isFirstNameValid() && isLastNameValid() && isAddressValid() && isCityValid() && isEmailValid())

    if (!isFormValid) {
        alert('Votre commande est validée')
        return;
    }

    const contact = {
        firstName : document.querySelector("#firstName").value,
        lastName : document.querySelector("#lastName").value,
        address : document.querySelector("#address").value,
        city : document.querySelector("#city").value,
        email : document.querySelector("#email").value,
    };

    const products = get('basket').map(a => a.id);

    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body:JSON.stringify({contact, products}) ,
            headers: {
                "Content-Type": "application/json",
            },
        }) 
        .then((response) => response.json())
        .then((data) => {
            alert("Votre commande à bien était prise en compte");
            location.href = "confirmation.html?orderId=" + data.orderId;
    })


})

document.querySelector("#firstName").addEventListener('input', () => {
    isFirstNameValid ()
})
function isFirstNameValid () {
    let firstName = document.querySelector("#firstName").value;
    if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(firstName)) {
        hideError("#firstNameErrorMsg");
        return true;
    } 
    showError("#firstNameErrorMsg", "Champ Prénom de formulaire invalide, ex: Bernard")
    return false;
}

document.querySelector("#lastName").addEventListener('input', () => {
    isLastNameValid ()
})
function isLastNameValid () {
    let lastName = document.querySelector("#lastName").value; 
    if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lastName)) {
        hideError("#lastNameErrorMsg")
        return true;
    } 
    showError("#lastNameErrorMsg", "Champ Nom de formulaire invalide, ex: Durand")
    return false;        
}

document.querySelector("#address").addEventListener('input', () => {
    isAddressValid ()
})
function isAddressValid () {
    let address = document.querySelector("#address").value;
    if (/^[A-Za-z0-9\,\s]{5,100}$/.test(address)) {
        hideError("#addressErrorMsg")
        return true;
    } 
    showError("#addressErrorMsg", "Champ Adresse de formulaire invalide, ex: 50 rue de la paix")
    return false;    
}

document.querySelector("#city").addEventListener('input', () => {
    isCityValid ()
})
function isCityValid () {
    let city = document.querySelector("#city").value;
    if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(city)) {
        hideError("#cityErrorMsg")
        return true;
    } 
    showError("#cityErrorMsg", "Champ Ville de formulaire invalide, ex: Bordeaux")
    return false;    
}

document.querySelector("#email").addEventListener('input', () => {
    isEmailValid ()
})
function isEmailValid () {
    let email = document.querySelector("#email").value;
    if (/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email)) {
        hideError("#emailErrorMsg")
        return true;
    } 
    showError("#emailErrorMsg", "Champ Email de formulaire invalide, ex: example@contact.fr")
    return false;    
}

function showError (selector, message) {
    const el = document.querySelector(selector);
    el.textContent = message;
    const input = el.previousElementSibling
    input.style.border = "solid 2px red";
}

function hideError(selector) {
    const el = document.querySelector(selector);
    el.textContent = "";
    const input = el.previousElementSibling
    input.style.border = "solid 2px green";
}
