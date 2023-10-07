'use strict';

const readline = require('node:readline');
const connection = require('./lib/connectMongoose');
const Articles = require('./model/Article');
const initData = require('./init-db-data.json');

main().catch(err => console.log('Hubo un error', err));

async function main() {

  await new Promise(resolve => connection.once('open', resolve))
  await initArticles();

  connection.close();
}

async function initArticles() {
  const deleted = await Articles.deleteMany();
  console.log(`Deleted ${deleted.deletedCount} Articles.`);

  const inserted = await Articles.insertMany(initData.Articles);
  console.log(`Inserted ${inserted.length} Articles.`);
}
