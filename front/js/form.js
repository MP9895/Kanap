// Validation du formulaire
let form = document.querySelector(".cart__order__form");

form.firstName.addEventListener('input', function(e) {
    let value = e.target.value;
    hideError(form.firstName);;
    if (!isFirstNameValid(value)) {
        showError(form.firstName, 'Champ invalide, veuillez vérifier votre prénom.');
    }
});

form.lastName.addEventListener('input', function(e) {
    let value = e.target.value;
    hideError(form.lastName);
    if (!isLastNameValid(value)) {
        showError(form.lastName, 'Champ invalide, veuillez vérifier votre nom.');
    }
});

form.address.addEventListener('input', function(e) {
    let value = e.target.value;
    hideError(form.address);;
    if (!isAdressValid.test(value)) {
        showError(form.address, 'Champ invalide, veuillez vérifier votre adresse postale.');
    }
});

form.city.addEventListener('input', function(e) {
    let value = e.target.value;
    hideError(form.city);
    if (!isCityValid.test(value)) {
        showError(form.city, 'Champ invalide, veuillez vérifier votre ville.');
    }
});

form.email.addEventListener('input', function(e) {
    let value = e.target.value;
    hideError(form.email);
    if (!isMailValid.test(value)) {
        showError(form.email, 'Champ invalide, veuillez vérifier votre adresse email.');
    }
});

document.getElementById('order').addEventListener('click', (e) => {
    e.preventDefault
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    if (isFirstNameValid(firstName) && isLastNameValid(lastName)) {
        console.log('Le formulaire est bon');
    }
})

function showError(input, message) {
    const el = input.nextElementSibling
    el.innerHTML = message;
}

function hideError(input) {
    const el = input.nextElementSibling
    el.innerHTML = '';
}

function isFirstNameValid(value) {
    let regEx = new RegExp("^[A-zÀ-ú \-]+$");

    if (!regEx.test(value)) {
        return false
    }
    return true;
}

function isLastNameValid(value) {
    let regEx = new RegExp("^[A-zÀ-ú \-]+$");

    if (!regEx.test(value)) {
        return false
    }
    return true;
}

function isAdressValid(value) {
    let regEx = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");

    if (!regEx.test(value)) {
        return false
    }
    return true;
}

function isCityValid(value) {
    let regEx = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");

    if (!regEx.test(value)) {
        return false
    }
    return true;
}

function isMailValid(value) {
    let regEx = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

    if (!regEx.test(value)) {
        return false
    }
    return true;
}