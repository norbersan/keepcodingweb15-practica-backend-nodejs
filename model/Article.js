const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  name: { type: String, index: true },
  type: { type: String },
  price: { type: Number},
  photo: { type: String},
  tags: { type: [String]}// work, lifestyle, motor, mobile
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