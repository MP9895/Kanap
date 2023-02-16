const storage = localStorage;

function fetchData(url) {
    return fetch(url).then(response => response.json());
}

function store (key, value) {
    storage.setItem(key, JSON.stringify(value));
}

function get(key) {
    return JSON.parse(storage.getItem(key));
}

function has(key) {
    return !! (storage.getItem(key));
}

function price(amount) {
    const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    }); 
    return formatter.format(amount);
}

export {fetchData, store, get, has, price}