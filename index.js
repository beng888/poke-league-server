const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
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

db.sequelize
  .sync()
  .then(() => app.listen(process.env.PORT))
  .catch((err) => {
    console.log(err);
  });
