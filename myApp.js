require('dotenv').config();
const mongoose = require('mongoose');

// เชื่อม MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// เพิ่ม listener สำหรับจับ error connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
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

// Remove Many People
const removeManyPeople = (nameToRemove, done) => {
  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    // result.deletedCount จะบอกจำนวนเอกสารที่ถูกลบ
    return done(null, result);
  });
};

// 🔹 Export ให้ FreeCodeCamp ใช้
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.removeManyPeople = removeManyPeople;