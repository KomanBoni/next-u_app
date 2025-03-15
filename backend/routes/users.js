const express = require('express');
const { Utilisateur } = require('../models/db');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.findAll();
        res.json(utilisateurs);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});


router.post('/', async (req, res) => {
    const { nom, email, mot_de_passe } = req.body;
    try {
        const nouvelUtilisateur = await Utilisateur.create({ nom, email, mot_de_passe });
        res.status(201).json(nouvelUtilisateur);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ message: "Erreur lors de la création." });
    }
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        res.json(utilisateur);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { nom, email, mot_de_passe } = req.body;
    try {
        const [updated] = await Utilisateur.update({ nom, email, mot_de_passe }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        res.status(500).json({ message: "Erreur lors de la mise à jour." });
    }
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Utilisateur.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.status(500).json({ message: "Erreur lors de la suppression." });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const utilisateur = await Utilisateur.findOne({ where: { email } });
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(password, utilisateur.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        const token = jwt.sign({ id: utilisateur.id }, 'votre_clé_secrète', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

module.exports = router;
