require('dotenv').config();
const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 2. Create a Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// 3. Create a Model
const Person = mongoose.model("Person", personSchema);

// 4. Create and Save a Record
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// ✅ Export (FreeCodeCamp ใช้อ่านตรงนี้)
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;