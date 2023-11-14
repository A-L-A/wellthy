const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// CONNECT APP TO MONGO DATABSE

const mongoUrl =
  "mongodb+srv://admin:SVcfT0UNg0Huoxpq@cluster0.di0boil.mongodb.net/?retryWrites=true&w=majority";

  mongoose.connect(mongoUrl,{
  }).then(()=>{console.log("Successfully connected to database");})
  .catch(e=>console.log(e));



// Initialize express-session to store sessions
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use the local strategy for authentication
passport.use(
  new LocalStrategy((username, password, done) => {
    Alumni.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      bcrypt.compare(password, user.password, (err, res) => {
        if (res) return done(null, user);
        return done(null, false, { message: 'Incorrect password.' });
      });
    });
  })
);

// Passport serialization and deserialization (used to store user data in sessions)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Alumni.findById(id, (err, user) => {
    done(err, user);
  });
});


// Import routes
const routes = require('./routes/routes');
app.use('/', routes);

//Import models
const Events = require("./models/event");


// STARTING SERVER WITH EXPRESS
app.listen(3000, ()=> {
  console.log(`Server started on port ${3000}`);
});