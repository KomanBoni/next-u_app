const express = require('express');
const { sequelize } = require('./models/db'); 


const app = express();
const PORT = 3000;

app.use(express.json());


sequelize.sync()
    .then(() => {
        console.log('Les modèles ont été synchronisés avec la base de données.');
    })
    .catch(err => {
        console.error('Erreur lors de la synchronisation des modèles:', err);
    });

app.get('/', (req, res) => {
    res.send('Hola que tal !');
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
