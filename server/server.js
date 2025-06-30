const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/pets',petRoutes);
app.use('/api/orders',orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});