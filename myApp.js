require('dotenv').config();
const mongoose = require('mongoose');

// ----- Connect to MongoDB -----
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// ----- Define Schema -----
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// ----- Create Model -----
const Person = mongoose.model("Person", personSchema);

// ----- Create and Save a Record -----
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ----- Create Many Records -----
const arrayOfPeople = [
  { name: "Mary", age: 20, favoriteFoods: ["Salad", "Fish"] },
  { name: "Peter", age: 30, favoriteFoods: ["Steak", "Pasta"] },
  { name: "Mary", age: 25, favoriteFoods: ["Sushi"] }
];

const createManyPeople = (done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ----- Find People by Name -----
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ----- Delete Many People -----
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

// ----- Exports (FCC ใช้อ่านค่าตรงนี้) -----
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.removeManyPeople = removeManyPeople;