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

// 1) Create and Save One Person
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John",
    age: 25,
    favoriteFoods: ["pizza", "burger"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// 2) Create Many Records
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};

// 3) Find People by Name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};

// 4) Find One by Food
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return done(err);
    return done(null, person);
  });
};

// 5) Find by ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    return done(null, person);
  });
};

// 6) Find, Edit then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    });
  });
};

// 7) Find One and Update
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return done(err);
      return done(null, updatedDoc);
    }
  );
};

// 8) Delete One by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return done(err);
    return done(null, removedDoc);
  });
};

// 9) Delete Many People
const removeManyPeople = (nameToRemove, done) => {
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    // แปลงผลลัพธ์ให้ FCC test รับได้
    const fixedResult = {
      n: result.deletedCount || 0,
      ok: result.acknowledged ? 1 : 0
    };
    return done(null, fixedResult);
  });
};

// 10) Chain Search Query Helpers
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return done(err);
      return done(null, data);
    });
};

// Export
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;