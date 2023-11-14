const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const alumniSchema = new mongoose.Schema({
  fname: { type: String, required: true},
  lname: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
});

// Use bcrypt to hash the user's password before saving to the database
alumniSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const Alumni = mongoose.model('Alumni', alumniSchema);
module.exports = Alumni;
