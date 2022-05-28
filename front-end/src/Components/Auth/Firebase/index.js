// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";



// documentation referenced -> https://firebase.google.com/docs/auth/web/start?authuser=0

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuAOUJLYdyQRwXAzNzk3dRzp1na1qmTMs",
  authDomain: "kanbanwarriors.firebaseapp.com",
  projectId: "kanbanwarriors",
  storageBucket: "kanbanwarriors.appspot.com",
  messagingSenderId: "881155146684",
  appId: "1:881155146684:web:3ed4710fb0ce5e5d00e1b9",
  measurementId: "G-EPQ73S1YRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize the google provider
const provider = new GoogleAuthProvider();


export const GoogleSignIn = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // redux stuff
    //store.dispatch(saveUserAuthentication(result));

    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

