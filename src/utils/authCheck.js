import { auth } from "@/firebase/firebase.config";

export const authCheck = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      // User not signed in
      console.log("User not found");
      return false;
    }

    const token = await user.getIdToken();
    console.log("User token:", token);

    return true;
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
};
