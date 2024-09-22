const express = require('express');
const cors = require('cors'); // Importer cors
const app = express();

app.use(cors()); // Activer CORS
app.use(express.json());

// Définir la liste de livres
let livres = [
    { id: 1, titre: 'Harry Potter', auteur: 'J.K. Rowling', annee: 1997 },
    { id: 2, titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', annee: 1943 }
];

// Routes pour l'API
app.get('/livres', (req, res) => {
    res.json(livres);
});

app.post('/livres', (req, res) => {
    const nouveauLivre = {
        id: livres.length + 1,
        titre: req.body.titre,
        auteur: req.body.auteur,
        annee: req.body.annee
    };
    livres.push(nouveauLivre);
    res.status(201).json(nouveauLivre);
});

app.put('/livres/:id', (req, res) => {
    const livre = livres.find(l => l.id === parseInt(req.params.id));
    if (!livre) return res.status(404).send('Livre non trouvé');

    livre.titre = req.body.titre;
    livre.auteur = req.body.auteur;
    livre.annee = req.body.annee;
    res.json(livre);
});

app.delete('/livres/:id', (req, res) => {
    const index = livres.findIndex(l => l.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Livre non trouvé');

    const livreSupprimé = livres.splice(index, 1);
    res.json(livreSupprimé);
});

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`L'API écoute sur http://localhost:${port}`);
});
