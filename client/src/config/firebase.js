import firebase from 'firebase'
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBq0dDEBGnESsrtDQg_mxHxNjF_jzDFwsk",
    authDomain: "samspetcareadmin.firebaseapp.com",
    databaseURL: "https://samspetcareadmin.firebaseio.com",
    projectId: "samspetcareadmin",
    storageBucket: "samspetcareadmin.appspot.com",
    messagingSenderId: "410551427856"
  };
  const fire = firebase.initializeApp(config);
  export default fire



//   // Initialize Firebase

// const apiKey = process.env.apiKey
// const  authDomain = process.env.authDomain
// const  databaseURL = process.env.databaseURL
// const  projectId = process.env.projectId
// const  storageBucket = process.env.storageBucket
// const  messagingSenderId = process.env.messagingSenderId

// var config = {
//   apiKey,
//   authDomain,
//   databaseURL,
//   projectId,
//   storageBucket,
//   messagingSenderId
// };
// firebase.initializeApp(config);