let btnOrder = document.querySelector('#order');

btnOrder.addEventListener('click', function(e) {
    e.preventDefault();
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');
    
    

    if (basketStr == null) {
        alert("Pour passer commande, veuillez ajouter des produits à votre panier");
        e.preventDefault();
    } else if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
        alert("Vous devez renseigner vos coordonnées pour passer la commande !");
        e.preventDefault();
    } else if (nameRegExp.test(inputFirstName.value) ==  false || nameRegExp.test(inputLastName.value) ==  false || adressRegExp.test(inputAddress.value) ==  false || nameRegExp.test(inputCity.value) ==  false || emailRegExp.test(inputEmail.value) ==  false) {
        alert("Vérifiez vos coordonnées pour passer la commande !");
        e.preventDefault();
    } else {
        productID = [];
        for (let m = 0; m < basket.products.length; m++) {
        productID.push(basket.products[m].id);
        }
    }
});