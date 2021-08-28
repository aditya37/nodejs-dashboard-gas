var firebase = require('firebase-admin')
const service = require('../sc2.json')

var db = firebase.initializeApp({
  credential: firebase.credential.cert(service),
  databaseURL: "https://db-sensor-default-rtdb.firebaseio.com/"
});

module.exports = db;