require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// เชื่อม MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log("MongoDB connection error:", err));

// Schema และ Model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

// CRUD Functions

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  });
  person.save((err, data) => done(err, data));
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => done(err, people));
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, peopleFound) => done(err, peopleFound));
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => done(err, personFound));
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => done(err, personFound));
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found"));
    person.favoriteFoods.push("hamburger");
    person.save((err, updatedPerson) => done(err, updatedPerson));
  });
};

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => done(err, updatedPerson)
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => done(err, removedPerson));
};

const removeManyPeople = (nameToRemove, done) => {
  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result); // result จะมี { acknowledged: true, deletedCount: X }
  });
};

// Export functions
module.exports = {
  PersonModel: Person,
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople
};

// Start server (ไม่จำเป็นสำหรับ FreeCodeCamp test แต่ไว้เช็ค localhost)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));