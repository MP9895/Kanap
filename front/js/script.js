import { fetchData } from "./tools.js";
const products = await fetchData("http://localhost:3000/api/products/")
fetch("http://localhost:3000/api/products/")
    showProducts(products);

// Affichage des produits
function showProducts(products) {
    products.forEach(product => {

        // Lien de chaque canapés
        const a = document.createElement('a');
        const article = document.createElement('article');

       a.setAttribute('href', "product.html?id=" + product._id);
       a.appendChild(article);

        // Images
        let createImg = document.createElement('img');
        createImg.setAttribute('src', product.imageUrl);
        createImg.setAttribute('alt', product.altTxt);
        article.appendChild(createImg);
    
        // Noms
        let createTitle = document.createElement('h3');
        createTitle.className = 'productName';
        createTitle.textContent = product.name;
        article.appendChild(createTitle);

        // Descriptions
        let createP = document.createElement('p');
        createP.className = 'productDescription';
        createP.textContent = product.description;
        article.appendChild(createP);
        document.querySelector('.items').appendChild(a);
    });
}