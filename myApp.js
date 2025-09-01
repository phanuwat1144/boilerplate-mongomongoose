require('dotenv').config();
const mongoose = require('mongoose');

// ✅ เชื่อม MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// ✅ สร้าง Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

// ✅ สร้าง Model
const Person = mongoose.model("Person", personSchema);

// ----------------------------------------------------
// 1) Create and Save a Record of a Model
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

// ----------------------------------------------------
// 2) Create Many Records with model.create()
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};

// ----------------------------------------------------
// 3) Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};

// ----------------------------------------------------
// 4) Use model.findOne() to Return a Single Matching Document
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return done(err);
    return done(null, person);
  });
};

// ----------------------------------------------------
// 5) Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    return done(null, person);
  });
};

// ----------------------------------------------------
// 6) Perform Classic Updates by Running Find, Edit, then Save
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

// ----------------------------------------------------
// 7) Perform New Updates on a Document Using model.findOneAndUpdate()
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

// ----------------------------------------------------
// 8) Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return done(err);
    return done(null, removedDoc);
  });
};

// ----------------------------------------------------
// 9) Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ----------------------------------------------------
// 10) Chain Search Query Helpers to Narrow Search Results
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

// ----------------------------------------------------
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