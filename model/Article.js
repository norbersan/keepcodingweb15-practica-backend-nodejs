const mongoose = require('mongoose');
const logger = require('morgan');

const articleSchema = mongoose.Schema({
  name: { type: String, index: true },
  type: { type: String },
  price: { type: Number},
  photo: { type: String},
  tags: { type: [String]}// work, lifestyle, motor, mobile
}, {
  collection: 'articles'
});

articleSchema.statics.lista = function(filtro, skip, limit, sort) {
  console.log(filtro)
  console.log(skip)
  console.log(limit)
  const query = Article.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort)
  return query.exec();
}

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;