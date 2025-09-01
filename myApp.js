require('dotenv').config();
const mongoose = require('mongoose');

// เชื่อม MongoDB
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

// Delete Many People (FCC ต้องการ)
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    return done(null, result); // ส่งตรง ๆ ตาม FCC test
  });
};

// Export
exports.PersonModel = Person;
exports.removeManyPeople = removeManyPeople;