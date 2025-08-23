import { auth } from "@/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

/**
 * Sign in with email & password
 * @param {string} email
 * @param {string} password
 */
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Signed in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Sign in error:", error.message);
    throw error;
  }
};
