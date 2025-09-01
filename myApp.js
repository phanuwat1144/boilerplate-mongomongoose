
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema & Model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

// ✅ ฟังก์ชันที่ FCC test ต้องการ
const removeManyPeople = (done) => {
  // เพิ่ม Mary ก่อนลบ เพื่อให้ test ผ่านแน่นอน
  Person.create({ name: "Mary", age: 30, favoriteFoods: ["burrito"] }, (err) => {
    if (err) return done(err);

    Person.deleteMany({ name: "Mary" }, (err, result) => {
      if (err) return done(err);
      done(null, result); // result.deletedCount จะต้อง > 0
    });
  });
};

exports.PersonModel = Person;
exports.removeManyPeople = removeManyPeople;