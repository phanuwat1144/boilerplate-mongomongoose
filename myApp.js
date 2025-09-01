require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Model
const Person = mongoose.model("Person", personSchema);

// 🔹 Remove Many People
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    return done(null, result);
  });
};

// 🔹 Export ให้ FreeCodeCamp ใช้
exports.PersonModel = Person;
exports.removeManyPeople = removeManyPeople;