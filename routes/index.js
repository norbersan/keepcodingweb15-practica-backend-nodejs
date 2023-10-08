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

module.exports = router;
