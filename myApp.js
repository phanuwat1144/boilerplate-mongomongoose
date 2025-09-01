require('dotenv').config();
const mongoose = require('mongoose');

// เชื่อมต่อฐานข้อมูล
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Database connected successfully"))
.catch(err => console.error("Database connection error:", err));

// -------------------------
// สร้าง Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// สร้าง Model
const Person = mongoose.model("Person", personSchema);

// ✅ FreeCodeCamp ต้องการให้ export ตัว Model ออกมา
module.exports = Person; error:", err));