require('dotenv').config();
const mongoose = require('mongoose');

// เชื่อม MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Model (collection ชื่อ 'people')
const Person = mongoose.model("people", personSchema);

// --- Insert dummy data สำหรับ test ---
const insertDummyData = () => {
  const dummyPeople = [
    { name: "Mary", age: 16, favoriteFoods: ["burrito"] },
    { name: "Alice", age: 25, favoriteFoods: ["burrito", "Pizza"] },
    { name: "Bob", age: 30, favoriteFoods: ["Pasta"] }
  ];

  // ใช้ insertMany แต่ ignore error ถ้า data ซ้ำ
  Person.insertMany(dummyPeople, { ordered: false }, (err, docs) => {
    if (err) console.log("Dummy data insert ignored duplicates:", err.message);
  });
};

// เรียก insert dummy data
insertDummyData();

// --- FCC Functions ---

// 1️⃣ Create & Save one person
const createAndSavePerson = (done) => {
  const person = new Person({ name: "John", age: 25, favoriteFoods: ["Pizza", "Burger"] });
  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 2️⃣ Create many people
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 3️⃣ Find people by name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 4️⃣ Find one person by food
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 5️⃣ Find person by ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 6️⃣ Update: Classic
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// 7️⃣ Update: Using findOneAndUpdate
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

// 8️⃣ Delete one by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    done(null, removedPerson);
  });
};

// 9️⃣ Delete many people
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

// 🔟 Query chain: Chaining query helpers
const queryChain = (done) => {
  const foodToSearch = "burrito";

  // สร้าง query object ก่อน
  const findQuery = Person.find({ favoriteFoods: foodToSearch });

  // chain helpers ตาม FCC hints
  findQuery
    .sort({ name: 1 })      // เรียงชื่อ A → Z
    .limit(2)               // limit 2 doc
    .select({ age: 0 })     // ซ่อน age
    .exec((err, data) => {  // execute query
      if (err) return done(err);
      done(null, data);
    });
};

// --- Exports ---
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