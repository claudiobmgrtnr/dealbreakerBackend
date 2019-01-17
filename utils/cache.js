const cron = require('node-cron');
const accumulator = require('../data/accumulator').getData
const db = require('../db/db');

const init = () => {
  // set initial data 
  accumulator().then((result) => {
    db.setData(result.data);
    db.setTimeStamp();
  });

  // get data every 30 minutes
  cron.schedule('*/30 * * * *', () => {
    accumulator().then((result) => {
      db.setData(result.data);
      db.setTimeStamp();
    });
  });
};

module.exports.init = init;