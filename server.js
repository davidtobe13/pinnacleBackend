const express = require('express');
// const mongoose = require('mongoose');
require('./config/config');
const cors = require('cors');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routers/vehicleRoutes');
const houseRoutes = require('./routers/houseRoutes');
const allProductRoutes = require('./routers/allProductRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/', vehicleRoutes);
app.use('/api/', houseRoutes);
app.use('/api/', allProductRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


