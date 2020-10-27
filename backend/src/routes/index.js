const { Router } = require('express');
const router = Router();

const faker = require('faker');
const Article = require('../models/article');

router.get('/create', async (req, res) => {
    for (let i = 0; i < 100; i++) {
        await Article.create({
            title: faker.name.title(),
            imageURL: faker.image.imageUrl(),
            description: faker.lorem.paragraph()
        })
    }
    res.send('100 records created')
});

router.get('/article', async (req, res) => {
    const articles = await Article.find();
    res.json({articles});
});

module.exports = router