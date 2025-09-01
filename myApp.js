require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 1️⃣ เชื่อม MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log("MongoDB connection error:", err));

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error event:', err);
});

// 2️⃣ สร้าง Schema และ Model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

// 3️⃣ CRUD Functions

// Create and Save One Person
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  });

  person.save((err, data) => done(err, data));
};

// Create Many People
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => done(err, people));
};

// Find People by Name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, peopleFound) => done(err, peopleFound));
};

// Find One Person by Favorite Food
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => done(err, personFound));
};

// Find Person by ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => done(err, personFound));
};

// Classic Update: find -> edit -> save
const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found"));
    person.favoriteFoods.push("hamburger");
    person.save((err, updatedPerson) => done(err, updatedPerson));
  });
};

// New Update: findOneAndUpdate
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => done(err, updatedPerson)
  );
};

// Delete One Document by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => done(err, removedPerson));
};

// Delete Many People by Name
const removeManyPeople = (nameToRemove, done) => {
  Person.deleteMany({ name: nameToRemove }, (err, result) => done(err, result));
};

// 4️⃣ Export Functions (FreeCodeCamp / Testing)
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

// 5️⃣ เริ่ม server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));