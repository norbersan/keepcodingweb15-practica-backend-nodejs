const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  name: { type: String, index: true },
  age: { type: Number, index: true, min: 18, max: 120 },
}, {
  collection: 'articles'
});

articleSchema.statics.lista = function(filtro, skip, limit) {
  const query = Agente.find(filtro);
  query.skip(skip);
  query.limit(limit);
  return query.exec();
}

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;