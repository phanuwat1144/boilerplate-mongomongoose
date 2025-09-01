require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

// ------------------------
// Delete Many People
const removeManyPeople = (nameToRemove, done) => {
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result); // ส่ง result กลับตรง ๆ
  });
};

// Export
exports.PersonModel = Person;
exports.removeManyPeople = removeManyPeople;