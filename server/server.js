const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const cors = require('cors');

const systemDataRoutes = require('./routes/systemDataRoutes');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/system-data', systemDataRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })

  .then(() => {
    console.log('MongoDB Connected');

    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })

  .catch((err) => console.error('MongoDB connection error:', err));
