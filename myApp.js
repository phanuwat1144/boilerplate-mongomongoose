require('dotenv').config();
const mongoose = require('mongoose');

// 1️⃣ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 2️⃣ Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// 3️⃣ Model
const Person = mongoose.model("Person", personSchema);

// 4️⃣ Create & Save one person
const createAndSavePerson = (done) => {
  const person = new Person({ name: "John", age: 25, favoriteFoods: ["Pizza", "Burger"] });
  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 5️⃣ Create many people
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 6️⃣ Find people by name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 7️⃣ Delete many people (ผ่าน FCC test)
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result); // result.deletedCount จะบอกจำนวนที่ลบ
  });
};

// 8️⃣ Exports
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.removeManyPeople = removeManyPeople;