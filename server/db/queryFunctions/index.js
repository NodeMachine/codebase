const firebase = require('firebase')
const keys = require('../../../keys')

const firebaseConfig = {
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  databaseURL: keys.databaseURL,
  projectId: keys.projectId,
  storageBucket: keys.storageBucket,
  messagingSenderId: keys.messagingSenderId,
  appId: keys.appId
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

module.exports = db
