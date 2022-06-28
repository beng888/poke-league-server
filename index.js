const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: true,
  credentials: true,
};
app.options('*', cors(corsOptions));

app.use(cors({ credentials: true, origin: process.env.ORIGIN_URL }));
app.use(express.json());
app.use(cookieParser());

const db = require('./models');
const { errorHandler } = require('./middlewares/errorMiddleware');

/* --------------------------------- Routers -------------------------------- */

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/league', require('./routes/league.route'));
app.use('/api/team', require('./routes/team.route'));
app.use('/api/pokemon', require('./routes/pokemon.route'));

/* -------------------------------------------------------------------------- */

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      // console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // console.log(err);
  });
