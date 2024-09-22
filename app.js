/// L'adresse de base de ton API
const apiUrl = "http://localhost:3000/livres";

// Fonction pour récupérer et afficher tous les livres
async function afficherLivres() {
    console.log("Tentative de récupération des livres..."); // Message de debug

    try {
        // Essayer de se connecter à l'API
        const response = await fetch(apiUrl);
        console.log("Réponse reçue de l'API :", response); // Affiche la réponse complète

        // Vérifier si la réponse est correcte
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des livres : ${response.status} ${response.statusText}`);
        }

        // Convertir la réponse en JSON
        const data = await response.json();
        console.log("Données reçues :", data); // Affiche les données reçues

        const listeLivres = document.getElementById('liste-livres');
        listeLivres.innerHTML = ''; // Efface la liste actuelle

        data.forEach(livre => {
            const li = document.createElement('li');
            li.textContent = `${livre.titre} par ${livre.auteur} (${livre.annee})`;

            // Bouton pour supprimer le livre
            const boutonSupprimer = document.createElement('button');
            boutonSupprimer.textContent = "Supprimer";
            boutonSupprimer.onclick = () => supprimerLivre(livre.id);

            // Bouton pour modifier le livre
            const boutonModifier = document.createElement('button');
            boutonModifier.textContent = "Modifier";
            boutonModifier.onclick = () => modifierLivre(livre);

            li.appendChild(boutonSupprimer);
            li.appendChild(boutonModifier);
            listeLivres.appendChild(li);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
        alert(`Erreur de connexion à l'API : ${error.message}`); // Alerter l'utilisateur en cas d'erreur
    }
}

// Charger les livres dès que la page est ouverte
afficherLivres();



// Fonction pour ajouter un nouveau livre
document.getElementById('form-livre').addEventListener('submit', (event) => {
    event.preventDefault();

    const nouveauLivre = {
        titre: document.getElementById('titre').value,
        auteur: document.getElementById('auteur').value,
        annee: document.getElementById('annee').value
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nouveauLivre)
    })
    .then(() => {
        afficherLivres(); // Rafraîchir la liste des livres
        document.getElementById('form-livre').reset(); // Réinitialiser le formulaire
    })
    .catch(error => console.error('Erreur:', error));
});

// Fonction pour supprimer un livre
function supprimerLivre(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => afficherLivres()) // Rafraîchir la liste des livres
    .catch(error => console.error('Erreur:', error));
}

// Fonction pour modifier un livre
function modifierLivre(livre) {
    const nouveauTitre = prompt("Nouveau titre :", livre.titre);
    const nouvelAuteur = prompt("Nouvel auteur :", livre.auteur);
    const nouvelleAnnee = prompt("Nouvelle année :", livre.annee);

    if (nouveauTitre && nouvelAuteur && nouvelleAnnee) {
        fetch(`${apiUrl}/${livre.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titre: nouveauTitre,
                auteur: nouvelAuteur,
                annee: nouvelleAnnee
            })
        })
        .then(() => afficherLivres())
        .catch(error => console.error('Erreur:', error));
    }
}

// Charger les livres dès que la page est ouverte
afficherLivres();
