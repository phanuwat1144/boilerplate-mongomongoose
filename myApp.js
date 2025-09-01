require('dotenv').config();
const mongoose = require('mongoose');

// Connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Model
const Person = mongoose.model("Person", personSchema);

// Create & Save one
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

// ✅ Create many (ต้องรับ arrayOfPeople, done)
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Find by name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ✅ Delete many (ทดสอบรุ่นใหม่ของ FCC มักยอมรับ deleteMany ดีกว่า remove)
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

// Exports for FCC
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.removeManyPeople = removeManyPeople;