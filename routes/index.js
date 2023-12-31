'use strict';

const express = require('express');
const router = express.Router();
const Articles = require('../model/Article');
const logger = require('morgan');
const Article = require('../model/Article');

/**
 * @openapi
 * /api/articles:
 *  get:
 *   description: Returns a list of articles
 *   responses:
 *    200:
 *     description: returns JSON
 */
router.get('/', async (req, res, next) => {
  try {
    const filterByName = req.query.name;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const sort = req.query.sort;

    const filtro = {};

    if (filterByName) {
      filtro.name = filterByName;
    }

    const articles = await Articles.lista(filtro, skip, limit, sort);

    res.json({ results: articles })

  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/articles:
 *  post:
 *   description: Saves an article
 *   responses:
 *    200:
 *     description: returns JSON
 */
router.post('/', async (req, res, next) => {
  try {
    const articleData = req.body;

    const article = new Article(articleData);

    const saved = await article.save();

    res.json({ result: saved });

  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /api/articles:
 *  post:
 *   description: Return the list of tags
 *   responses:
 *    200:
 *     description: returns JSON
 */
router.get('/tags', function(req, res, next) {
  res.send('["work","lifestyle","motor","mobile"]');
})

/**
 * @openapi
 * /api/articles/ui:
 *  get:
 *   description: Simple ui to show all articles
 *   responses:
 *    200:
 *     description: returns html page with all articles
 */
router.get('/ui', async function(req, res, next) {

  res.locals.title = "Articles list";
  res.locals.articles = await Articles.lista({});

  res.render('../views/index.ejs');
});

module.exports = router;
