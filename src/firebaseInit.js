import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAeciOJFTDm5LLgdviDAVzIbP3QakzwTg4",
    authDomain: "javert-8906c.firebaseapp.com",
    databaseURL: "https://javert-8906c.firebaseio.com",
    projectId: "javert-8906c",
    storageBucket: "javert-8906c.appspot.com",
    messagingSenderId: "85508451710",
    appId: "1:85508451710:web:9fbcd255f115818ec5172f",
    measurementId: "G-KRFRPLCEDG"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);