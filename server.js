const express = require('express');
const app = express();
const digitec = require('./data/digitec');


const port = process.env.PORT || 8081;
const router = express.Router();

router.get('/deals', (req, res) => {
  digitec.getDigitecData().then((data) => {

    res.json(data);
  });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
