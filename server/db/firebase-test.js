const firebase = require('firebase')
const keys = require('../../keys')
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: keys.firebase,
  authDomain: 'da-code-tawars.firebaseapp.com',
  databaseURL: 'https://da-code-tawars.firebaseio.com',
  projectId: 'da-code-tawars',
  storageBucket: 'da-code-tawars.appspot.com',
  messagingSenderId: '733238232527',
  appId: '1:733238232527:web:aef337ce6ec4e2f0'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

const userRef = db.collection('users').doc('anJOsQ9t3icXn3BNOWS1')

userRef.update({name: 'bar', age: 28})

const anotherUserRef = db.collection('users').doc('p1Kt3PAj1H5B63TKXlZ0')

anotherUserRef.set({name: 'foor', age: 45})

const usersRef = db.collection('users')

let query = usersRef
  .where('age', '>', 30)
  .get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.')
      return
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data())
    })
  })
  .catch(err => {
    console.log('Error getting documents', err)
  })

let getDoc = userRef
  .get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!')
    } else {
      console.log('Document data:', doc.data())
    }
  })
  .catch(err => {
    console.log('Error getting document', err)
  })

let getOtherDoc = anotherUserRef
  .get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!')
    } else {
      console.log('Document data:', doc.data())
    }
  })
  .catch(err => {
    console.log('Error getting document', err)
  })
