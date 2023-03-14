export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {

        piecesElements[i].addEventListener("click", async function(event) {

            const id = event.target.dataset.id;
            //url personnalisée
            const response = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await response.json();
            //Ajout des avis au DOM: 
            //on récupère la cible de l'évènement:
            const pieceElement = event.target.parentElement;
            const avisElement = document.createElement('p');
            // Remplissage de la balise p en parcourant les avis
            for (let i = 0; i < avis.length; i++) {
                avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b>${avis[i].commentaire}<br>`

            }
            //On rattache l'élément p au parent
            pieceElement.appendChild(avisElement);



        });

    }

}