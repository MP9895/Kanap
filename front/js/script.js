fetch("http://localhost:3000/api/products/")
.then(response => response.json())
.then(function (products) {
    showProducts(products);
})
.catch(error => alert("Erreur : " + error));

// Affichage des produits
function showProducts(products) {
    products.forEach(product => {

        // Lien de chaque canapés
        const a = document.createElement('a');
        const article = document.createElement('article');

       a.setAttribute('href', "product.html?id=" + product._id);
       a.appendChild(article);

        // Images
        var createImg = document.createElement('img');
        createImg.setAttribute('src', product.imageUrl);
        createImg.setAttribute('alt', product.altTxt);
        article.appendChild(createImg);
    
        // Noms
        var createTitle = document.createElement('h3');
        createTitle.className = 'productName';
        createTitle.textContent = product.name;
        article.appendChild(createTitle);

        // Descriptions
        var createP = document.createElement('p');
        createP.className = 'productDescription';
        createP.textContent = product.description;
        article.appendChild(createP);

        document.querySelector('.items').appendChild(a);
    });
}