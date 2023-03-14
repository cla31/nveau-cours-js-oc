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
//gestion des bouttons :::::::::::::::::::::::
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
    // a et b représentent 2 élémnts de la liste à comparer
    piecesOrdonnees.sort(function(a, b) {
        return a.prix - b.prix;
    });
    console.log("piecesOrdonnees", piecesOrdonnees);
});

//Pour filtrer
const boutonFiltrer = document.querySelector(".btn-filtrer");
//Pas besoin de créer ici une copie de la liste, filter le fait pour nous.
boutonFiltrer.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= 35
    });
    console.log("piecesFiltrees", piecesFiltrees);
});

//Correction de l'exercice :::::::::::::::::::::::
//Correction Exercice:
// Editez les fichiers pieces.js et index.html pour y ajouter les fonctionnalités suivantes :

// --> filtrer la liste des pièces pour n’afficher que celles qui ont une description, à l’aide d’un bouton que vous ajouterez dans le HTML ;
// --> ordonner les listes selon le prix en ordre décroissant, à l’aide d’un bouton que vous ajouterez dans le HTML.

const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function() {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
});

const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.description
    });
    console.log(piecesFiltrees)
});

// Génération d'une liste qui ne contient que les noms des pièces:
//Retourne la valeur de la propriété nom de l'objet pièce
const noms = pieces.map(piece => piece.nom);
// Pour retirer le nom des pèces qui ne sont pas abordables:
//On commence à faire parcourir la boucle à partir du dernier indice: piece.length - 1
// A chaque tour de boucle la valeur de i est diminuée de 1, donc
//il ne faut pas descendre en dessous de 0:
for (let i = pieces.length - 1; i >= 0; i--) {
    // condition si le prix de la pièce est supérieur à 35:
    if (pieces[i].prix > 35) {
        //Si c le cas, suppression du nom de la pièce dans la liste nom
        noms.splice(i, 1);

    }
}
// Création des éléments du DOM qui formeront la liste à l'écran:
const abordablesElements = document.createElement('ul');
//Parcours de la liste des noms
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}

//Appel de la fonction appenChild sur le parent
document.querySelector(".abordables").appendChild(abordablesElements);

//Code Exercice 
// affichez une description des pièces disponibles à côté de la description des pièces abordables. 
//L’intitulé de la pièce devra aussi contenir son prix. Par exemple :

// Pièces disponibles :

// Ampoule LED – 60 €.
// Plaquette de frein (x4) – 40 €.
// Liquide de frein – 9,6 €.

const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].disponibilite === false) {
        nomsDisponibles.splice(i, 1);
        prixDisponibles.splice(i, 1);
    }
}

const disponiblesElement = document.createElement('ul');

for (let i = 0; i < nomsDisponibles.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElement.appendChild(nomElement);
}

document.querySelector('.disponibles').appendChild(disponiblesElement);