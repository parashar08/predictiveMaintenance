const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const apiRoute = require('./routes/dot.js');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', apiRoute);

connectDB()
  .then(() => {
    app.listen(8000, () => {
      console.log(`Server is listening on PORT: 8000`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
