const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://mugeskumar3:jlGkAgeZeQaUhh3Q@cluster0.aqgewzu.mongodb.net/realestate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  userType: String,
  sellerId: String,
});

UserSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

if (!user.sellerId) {
  user.sellerId = generateSellerId(); 
}

next();
});

const User = mongoose.model('User', UserSchema);

const PropertySchema = new mongoose.Schema({
  sellerId: String,
  name: String,
  place: String,
  area: String,
  bedrooms: String,
  bathrooms: String,
  nearby: String,
});

const Property = mongoose.model('Property', PropertySchema);

app.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user, sellerId: user.sellerId });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email);
    const user = await User.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.send({ success: true, userType: user.userType, sellerId: user._id }); // Return the sellerId upon successful login
      } else {
        res.status(401).send({ success: false, message: 'Invalid email or password' });
      }
    } else {
      res.status(401).send({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/api/seller/property', async (req, res) => {
  try {
    const { sellerId, name, place, area, bedrooms, bathrooms, nearby } = req.body;
    const property = new Property({ sellerId, name, place, area, bedrooms, bathrooms, nearby });
    await property.save();
    res.send({ property, sellerId });
  } catch (error) {
    console.error('Error posting property', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.get('/api/seller/properties', async (req, res) => {
  try {
    const { sellerId } = req.query;
    const properties = await Property.find({ sellerId });
    res.send(properties);
  } catch (error) {
    console.error('Error fetching properties', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.delete('/api/seller/property/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.send({ message: 'Property deleted' });
  } catch (error) {
    console.error('Error deleting property', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.send(properties);
  } catch (error) {
    console.error('Error fetching properties', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function generateSellerId() {
  const prefix = 'seller_'; 
  const randomNumber = Math.floor(Math.random() * 10000); 
  return prefix + randomNumber;
}