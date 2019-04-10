const mongoose = require('mongoose');

const politicianSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  position: String,
  picture: String,
  arrestment: {
    isArrested: Boolean,
    date: String,
  },
  details: String,
  references: [String],
  active: Boolean,
});

module.exports = mongoose.model('Politician', politicianSchema);