const cron = require('node-cron');
const accumulator = require('../data/accumulator').getData
const db = require('../db/db');

const init = () => {
  // set initial data 
  accumulator().then((result) => {
    db.setData(result.data);
    db.setTimeStamp();
  });

  // get data every 10-15 minutes
  cron.schedule('10-15 * * * *', () => {
    accumulator().then((result) => {
      db.setData(result.data);
      db.setTimeStamp();
    });
  });
};

module.exports.init = init;