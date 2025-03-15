const express = require('express');
const { Article } = require('../models/db');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.json(articles);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});


router.post('/', async (req, res) => {
    const { contenu } = req.body;
    try {
        const nouvelArticle = await Article.create({ contenu });
        res.status(201).json(nouvelArticle);
    } catch (error) {
        console.error('Erreur lors de la création de l\'article :', error);
        res.status(500).json({ message: "Erreur lors de la création." });
    }
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const article = await Article.findByPk(id);
        if (!article) {
            return res.status(404).json({ message: "Article non trouvé." });
        }
        res.json(article);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article :', error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { contenu } = req.body;
    try {
        const [updated] = await Article.update({ contenu }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: "Article non trouvé." });
        }
        res.status(200).json({ message: "Article mis à jour avec succès." });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'article :', error);
        res.status(500).json({ message: "Erreur lors de la mise à jour." });
    }
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await Article.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: "Article non trouvé." });
        }
        res.status(200).json({ message: "Article supprimé avec succès." });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article :', error);
        res.status(500).json({ message: "Erreur lors de la suppression." });
    }
});

module.exports = router;
