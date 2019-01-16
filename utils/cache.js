const cron = require('node-cron');
const accumulator = require('../data/accumulator').getData
const db = require('../db/db');

const init = () => {
  // set initial data 
  accumulator().then((result) => {
    db.setData(result.data);
  });

  // get data every 5 minutes
  cron.schedule('*/30 * * * *', () => {
    accumulator().then((result) => {
      db.setData(result.data);
    });
  });
};

module.exports.init = init;