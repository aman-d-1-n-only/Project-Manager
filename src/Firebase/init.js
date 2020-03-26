//as we install it with npm package manager we need to import it
import firebase from "firebase"
import firestore from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAl57Sl0BXOQLL_DEjRlZECxlItMDdMubk",
    authDomain: "project-manager-462bd.firebaseapp.com",
    databaseURL: "https://project-manager-462bd.firebaseio.com",
    projectId: "project-manager-462bd",
    storageBucket: "project-manager-462bd.appspot.com",
    messagingSenderId: "629262856749",
    appId: "1:629262856749:web:9497dbc0dbd2e038befea4",
    measurementId: "G-SG74J8LGX3"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebaseApp.firestore()