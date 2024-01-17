const { Schema } = require('mongoose');

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: String,
  },
  categoryType: {
    type: String,
  },
});

module.exports = CategorySchema;
