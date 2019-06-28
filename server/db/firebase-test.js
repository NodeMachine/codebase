const firebase = require('firebase')
const keys = require('../../keys')
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: keys.firebase,
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

// const problemRef = db.collection('problems').doc().set({
// 	category: 'algorithm',
// 	language: 'javascript',
// 	points: 12,
// 	prompt: 'Increment a number by 5.',
// 	tests: 'increment(1) === 6, increment(5) === 10',
// 	title: 'Increase By 5'
// });

const userRef = db.collection('users').doc()
const user2Ref = db.collection('users').doc()
const user3Ref = db.collection('users').doc()

// userRef.set({
// 	firstName: 'Ken',
// 	lastName: 'Doll',
// 	photo: 'https://i.ebayimg.com/images/g/eYkAAOSwALtaWWmr/s-l300.jpg',
// 	location: 'New York',
// 	bio: 'Likes long walks on the beach',
// 	email: 'ken@email.com',
// 	password: '123',
// 	score: '30',
// 	interests: 'Javascript'
// });

// user2Ref.set({
// 	firstName: 'Kanye',
// 	lastName: 'West',
// 	photo:
// 		'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Kanye_West_at_the_2009_Tribeca_Film_Festival-2_%28cropped%29.jpg/220px-Kanye_West_at_the_2009_Tribeca_Film_Festival-2_%28cropped%29.jpg',
// 	location: 'Los Angeles',
// 	bio: 'Wants to get better at algos',
// 	email: 'kanye@email.com',
// 	password: '123',
// 	score: '50',
// 	interests: 'Binary Trees'
// });

// user3Ref.set({
// 	firstName: 'Rihanna',
// 	lastName: 'Fenty',
// 	photo:
// 		'http://www.rihannanow.com/wp-content/uploads/2018/12/FB_POSTHOL18_MML_TIGERTINI_RRF_051_2000X2000_300DPI-800px-300x300.jpg',
// 	location: 'Miami',
// 	bio: 'Expert in docker',
// 	email: 'rihanna@email.com',
// 	password: '123',
// 	score: '74',
// 	interests: 'Dynamic Programming'
// });

// const userProblemRef = userRef.collection('problems').doc();
const userProblemRef = db
  .collection('users')
  .doc('ZTfJqUb5lxzCRF71IQE8')
  .collection('userProblems')
  .doc()

userProblemRef.set({
  isSolved: true,
  solution: 'function increment(num) { return num + 5}',
  category: 'algorithm',
  language: 'javascript',
  points: 12,
  prompt: 'Increment a number by 5.',
  tests: 'increment(1) === 6, increment(5) === 10',
  title: 'Increase By 5'
})

// const user2ProblemRef = db.collection('users').doc('eJJNI8FdivnRSLmyxMnA').collection('problems').doc();
const setUserProblem = async () => {
  try {
    // let userProb;
    const userProb = await db
      .collection('problems')
      .doc('LFVUhY31wLEn3Ge3hlvY')
      .get()
    // .then((doc) => {
    // 	userProb = doc.data();
    // 	return userProb;
    // });
    console.log('USER PROB', userProb.data())
    await db
      .collection('users')
      .doc('eJJNI8FdivnRSLmyxMnA')
      .collection('userProblems')
      .doc(userProb.id)
      .set({
        ...userProb.data(),
        isSolved: true,
        solution: 'function increment(num) { return num + 1}'
      })
    // .then((doc) => console.log(doc.data()));
  } catch (error) {
    console.log(error)
  }
}
setUserProblem()

// let query = usersRef
// 	.where('age', '>', 30)
// 	.get()
// 	.then((snapshot) => {
// 		if (snapshot.empty) {
// 			console.log('No matching documents.');
// 			return;
// 		}

// 		snapshot.forEach((doc) => {
// 			console.log(doc.id, '=>', doc.data());
// 		});
// 	})
// 	.catch((err) => {
// 		console.log('Error getting documents', err);
// 	});

// let getDoc = userRef
// 	.get()
// 	.then((doc) => {
// 		if (!doc.exists) {
// 			console.log('No such document!');
// 		} else {
// 			console.log('Document data:', doc.data());
// 		}
// 	})
// 	.catch((err) => {
// 		console.log('Error getting document', err);
// 	});

// let getOtherDoc = anotherUserRef
// 	.get()
// 	.then((doc) => {
// 		if (!doc.exists) {
// 			console.log('No such document!');
// 		} else {
// 			console.log('Document data:', doc.data());
// 		}
// 	})
// 	.catch((err) => {
// 		console.log('Error getting document', err);
// 	});
