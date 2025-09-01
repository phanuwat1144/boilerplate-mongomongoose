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
  // ✅ สร้าง instance ของ Model
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  });

  // ✅ save ลง database
  person.save(function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
};

// 🔹 Export สำหรับ FreeCodeCamp Tests
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;