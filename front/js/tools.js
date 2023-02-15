function fetchData(url) {
    return fetch(url).then(response => response.json());
}

function store (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export {fetchData, store}