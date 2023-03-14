// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();
console.log(pieces);

//Création des éléments

const article = pieces[0];
const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
// prixElement.innerText = `Prix: ${article.prix} €`;
//Pour vérifier les données:
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
const categorieElement = document.createElement("p");
//On affiche que si la propriété catégorie existe ds le json:
//nullish ne fonctionne pas chez moi, alors je prends le ternaire
categorieElement.innerText = article.categorie ? article.categorie : "(Aucune catégorie)";
const descriptionElement = document.createElement("p");
//On affiche que si la propriété description existe ds le json:
descriptionElement.innerText = article.description ? article.description : "(Pas de description pour le moment)";
//Est-ce que l'article est disponible?
const stockElement = document.createElement("p");
stockElement.innerHTML = article.disponibilité ? "En stock" : "Rupture de stock";


// Pour rattacher tous ces éléments, nous avons besoin d'un parent,
// Ainsi, nous allons utiliser la fonction appendChild en JavaScript.
// La classe ".fiches" sera le parent
const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(stockElement);