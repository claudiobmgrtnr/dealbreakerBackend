const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db/db.json')
const db = low(adapter)

const init = () => {
  // Set up new db
  db.defaults({ data: []}).write();
  // Empty db if existing
  db.set('data', []).write();
}

const setData = (data) => {
  db.set('data', data).write();
}

const getData = () => {
  const data = { data: db.get('data').value() }
  return data;
}


module.exports.init = init;
module.exports.setData = setData;
module.exports.getData = getData;