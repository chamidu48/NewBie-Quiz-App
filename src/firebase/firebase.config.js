// Import the functions you need from the SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDlOdB3ecGH3263ki_3t8SxzQilbjGGKyo",
    authDomain: "newbie-quiz-2f639.firebaseapp.com",
    projectId: "newbie-quiz-2f639",
    storageBucket: "newbie-quiz-2f639.firebasestorage.app",
    messagingSenderId: "433428004713",
    appId: "1:433428004713:web:469fa885be07eb703047f8",
    measurementId: "G-9JXC5VN3HQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
