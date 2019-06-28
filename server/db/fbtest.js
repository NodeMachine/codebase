const firebase = require('firebase')
//const admin = require('firebase-admin');
const keys = require('../../KEYS')

//new Firebase("https://console.firebase.google.com/project/dacoda-wars");

//console.log("Keys: ", keys.firebase.api);

const config = {
  apiKey: keys.firebase.api,
  projectId: 'dacoda-wars',
  databaseURL: 'https://dacoda-wars.firebaseio.com',
  appId: '1:336830898290:web:c6277f8b72064b23'
}
//was firebase.initiali..
//admin.initializeApp(config);
firebase.initializeApp(config)
//const firestore = admin.firestore();

//firestore.collection('da-coda-db').doc('users').set({'user': 'Dennis', 'age': 18});

//let userRef = firebase.database().ref('users/');
// console.log("userRef: ", userRef);
// let userRef = firebase.firestore();//.ref('users/');

// userRef.set ({
//   John: {
//      number: 1,
//      age: 30
//   },

//   Amanda: {
//      number: 2,
//      age: 20
//   }
// });

const db = firebase.firestore()
//const db = firebase.storage();
let userRef = db.collection('users').doc('Dennis')
let usersRef = db.collection('users')

console.log('userRef: ', userRef)
console.log('usersRef: ', usersRef)

// userRef.set(
//   {
//     admin: 'somebody',
//   }
// )

// let userChild = userRef.child('users');

usersRef.push({
  name: 'Sam Peach'
})

//let rootRef = firebase.database().ref();
//console.log(rootRef);

//let usersRef = rootRef.child('users');

//console.log(usersRef)

//console.log('Firebase: ', Firebase);
