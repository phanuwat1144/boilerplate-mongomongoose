require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log("MongoDB connection error:", err));

// Schema & Model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

// CRUD Functions
const createAndSavePerson = (done) => {
  const person = new Person({ name: "John Doe", age: 25, favoriteFoods: ["Pizza","Burger"] });
  person.save((err, data) => done(err, data));
};

// เปลี่ยนตรงนี้
const removeManyPeople = (nameToRemove, done) => {
  Person.remove({ name: nameToRemove }, (err, result) => {  // <- ใช้ remove แทน deleteMany
    if(err) return done(err);
    done(null, result);
  });
};

// ==================== ตัวอย่างการเรียกฟังก์ชัน ====================
createAndSavePerson((err, data) => {
  if(err) console.log(err);
  else console.log("Created:", data);

  // ตัวอย่าง removeManyPeople
  removeManyPeople("John Doe", (err, result) => {
    if(err) console.log(err);
    else console.log("Deleted Count:", result.deletedCount);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));