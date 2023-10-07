'use strict';

const connection = require('./lib/connectMongoose');
const Articles = require('./model/Article');
const initData = require('./init-db-data.json');

main().catch(err => console.log('Error in init data', err));

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

  initData.Articles.forEach(element => {
    console.log(`Inserted ${JSON.stringify(element)}`)
  });
}
