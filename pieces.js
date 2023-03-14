// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();
console.log(pieces);

//Affichage de plusieurs fiches produits grace à la boucle for:
for (let i = 0; i < pieces.length; i++) {

    //Création des éléments
    const article = pieces[i];
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ? article.categorie : "(Aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ? article.description : "(Pas de description pour le moment)";
    const stockElement = document.createElement("p");
    stockElement.innerHTML = article.disponibilite ? "En stock" : "Rupture de stock";


    // Pour rattacher tous ces éléments, nous avons besoin d'un parent,
    // Ainsi, nous allons utiliser la fonction appendChild en JavaScript.
    // La classe ".fiches" sera le parent
    const sectionFiches = document.querySelector(".fiches");
    const pieceElement = document.createElement("article");
    sectionFiches.appendChild(pieceElement)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);
}

//Pour l'instant, tri et filtre n'apparaîssent que dans le console log
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function() {
    // pieces.sort(function(a, b) {
    //     return a.prix - b.prix;
    // });
    // console.log("Les pièces", pieces);
    //Pour ne pas que la liste d'origine soit modifiée
    //Création d'une copie de la liste avec la fonction Array.from:
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a, b) {
        return a.prix - b.prix;
    });
    console.log("piecesOrdonnees", piecesOrdonnees);
});

//Pour filtrer
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= 35
    });
    console.log("piecesFiltrees", piecesFiltrees);
});