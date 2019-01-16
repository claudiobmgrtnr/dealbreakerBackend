const express = require('express');
const app = express();
const cors = require('cors')

const db = require('./db/db');
const cache = require('./utils/cache');

db.init();
cache.init();

const port = process.env.PORT || 80;
const router = express.Router();

router.get('/deals', cors(), (req, res) => {
  res.json(db.getData());
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// ====================================================
app.listen(port);
