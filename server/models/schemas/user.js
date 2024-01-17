const { Schema } = require('mongoose');
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  role_type: {
    type: String,
    default: 'USER',
    required: true,
  },
});

module.exports = UserSchema;
