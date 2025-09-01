require('dotenv').config();
const mongoose = require('mongoose');

// 1️⃣ เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 2️⃣ สร้าง Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// 3️⃣ สร้าง Model
const Person = mongoose.model("Person", personSchema);

// 4️⃣ สร้างและบันทึกคนคนเดียว
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// 5️⃣ สร้างหลายคนพร้อมกัน
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};

// 6️⃣ หา people โดยชื่อ
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, peopleFound) => {
    if (err) return done(err);
    return done(null, peopleFound);
  });
};

// 7️⃣ หา **คนเดียว** ตามอาหารที่ชอบ
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, personFound) => {
    if (err) return done(err);
    return done(null, personFound);
  });
};

// 8️⃣ หา person คนเดียวตาม _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) return done(err);
    return done(null, personFound);
  });
};

// 9️⃣ Classic Update: find -> edit -> save
const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found"));

    // เพิ่ม "hamburger" ใน favoriteFoods
    person.favoriteFoods.push("hamburger");

    // บันทึก document ใหม่
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    });
  });
};

// 🔹 New Update: findOneAndUpdate
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName }, // query
    { age: 20 },          // update
    { new: true },        // คืน document หลังอัปเดต
    (err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    }
  );
};

// 🔹 Delete One Document by _id
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    return done(null, removedPerson);
  });
};

// 🔹 Delete Many Documents by name
const removeManyPeople = (nameToRemove, done) => {
  Person.deleteMany({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    return done(null, result); // result.deletedCount จะบอกจำนวนคนที่ลบ
  });
};

// 10️⃣ Export ให้ FreeCodeCamp ใช้
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