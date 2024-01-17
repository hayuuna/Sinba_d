const { Schema } = require('mongoose');

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = { BrandSchema };
