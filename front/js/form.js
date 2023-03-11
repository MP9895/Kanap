let form = document.querySelector(".cart__order__form");

btnSendForm.addEventListener('click', (e) => {
e.preventDefault();

const contact = {
    firstName : document.querySelector("#firstName").value,
    lastName : document.querySelector("#lastName").value,
    address : document.querySelector("#address").value,
    city : document.querySelector("#city").value,
    email : document.querySelector("#email").value,
    
};

function firstNameControle () {     
    const firstName = contact.firstName;  
    let inputFirstName = document.querySelector("#firstName");
    if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(firstName)) {
        inputFirstName.style.border = "solid 2px green";
        document.querySelector("#firstNameErrorMsg").textContent = "";
        return true;
    } 
    
    else {
        inputFirstName.style.border = "solid 2px red";
        document.querySelector("#firstNameErrorMsg").textContent = "Champ Prénom de formulaire invalide, ex: Bernard";
        return false;
    }
    
}

function lastNameControle () {     
    const lastName = contact.lastName; 
    let inputLastName = document.querySelector("#lastName"); 
    if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(lastName)) {
        inputLastName.style.border = "solid 2px green";
        document.querySelector("#lastNameErrorMsg").textContent = "";
        return true;
    } 
            
    else {
        inputLastName.style.border = "solid 2px red";
        document.querySelector("#lastNameErrorMsg").textContent = "Champ Nom de formulaire invalide, ex: Durand";
        return false;
    }
        
}

function addressControl () {     
    const adresse = contact.address;  
    let inputAddress = document.querySelector("#address");
    if (/^[A-Za-z0-9\s]{5,100}$/.test(adresse)) {
        inputAddress.style.border = "solid 2px green";
        document.querySelector("#addressErrorMsg").textContent = "";
        return true;
    } 
    
    else {
        inputAddress.style.border = "solid 2px red";
        document.querySelector("#addressErrorMsg").textContent = "Champ Adresse de formulaire invalide, ex: 50 rue de la paix";
        return false;
    }
    
}

function cityControl () {     
    const city = contact.city;  
    let inputCity = document.querySelector("#city");
    if (/^([A-Za-z\s]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(city)) {
        inputCity.style.border = "solid 2px green";
        document.querySelector("#cityErrorMsg").textContent = "";
        return true;
    } 
    
    else {
        inputCity.style.border = "solid 2px red";
        document.querySelector("#cityErrorMsg").textContent = "Champ Ville de formulaire invalide, ex: Bordeaux";
        return false;
    }
    
}

function emailControle () {     
    const email = contact.email;  
    let inputMail = document.querySelector("#email");
    if (/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email)) {
        inputMail.style.border = "solid 2px green";
        document.querySelector("#emailErrorMsg").textContent = "";
        return true;
    } 
    
    else {
        inputMail.style.border = "solid 2px red";
        document.querySelector("#emailErrorMsg").textContent = "Champ Email de formulaire invalide, ex: example@contact.fr";
        return false;
    }
    
}

if (firstNameControle() && lastNameControle() && addressControl() && cityControl() && emailControle()) {
    localStorage.setItem("contact", JSON.stringify(contact));
    sendFromToServer();
} 

else {
    alert("Veuillez bien remplir le formulaire")
}


var orderId = "";

function sendFromToServer () {

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body:JSON.stringify({contact, products}) ,
        headers: {
            "Content-Type": "application/json",
        },
    }) 
    
    .then((response) => {
        return response.json();
    })
    

    .then((server) => {
        orderId = server.orderId;
        if (orderId != "") {
            alert("Votre commande à bient était prise en compte");
            location.href = "confirmation.html?id=" + orderId;
        }
    })
}
})