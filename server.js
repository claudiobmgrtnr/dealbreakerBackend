const express = require('express');
const app = express();
const cors = require('cors')

const db = require('./db/db');
const cache = require('./utils/cache');

db.init();
cache.init();

const port = process.env.PORT || 8081;
const router = express.Router();

router.get('/deals', cors(), (req, res) => {
  res.json(db.getData());
});

router.get('/lastupdate', cors(), (req, res) => {
  res.json(db.getTimeStamp());
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// ====================================================
app.listen(port);
