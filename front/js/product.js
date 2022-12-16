let article = "";

// Recuperation des articles
getArticleDetail ();

function getArticleDetail() {
    fetch("http://")
    return
}

// Mettre l'image du produit
function getPost(article) {
    let imgProduit = document.createElement('img');
    imgProduit.src = article.imageUrl;
}

// Mettre le titre du produit
let nomProduit = document.getElementById('title');
nomProduit.innerHTML = article.name;

// Mettre le prix du produit
let prixProduit = document.getElementById('price');
prixProduit.innerHTML = article.price;

// Mettre la description du produit
let descriptionProduit = document.getElementById('description');
descriptionProduit.innerHTML = article.description;