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

// Create and Save One Person
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  });

  person.save(function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
};

// Create Many People
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};

// Find People by Name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, peopleFound) => {
    if (err) return done(err);
    return done(null, peopleFound);
  });
};

// Remove Many People (NEW FUNCTION)
const removeManyPeople = (nameToRemove, done) => {
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    return done(null, result);
  });
};

// 🔹 Export ให้ FreeCodeCamp ใช้
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.removeManyPeople = removeManyPeople; // ADD THIS EXPORT