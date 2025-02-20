import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const getUsers = async () => {
  try {
    const userCollection = collection(db, "users");
    const snapshot = await getDocs(userCollection);
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    console.error("Error fetching languages:", error.message);
    throw new Error(
      "Failed to connect to the database. Please try again later"
    );
  }
};

export const createUser = async (email, password) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return createdUser;
  } catch (error) {
    console.log("Failed create a new user", error.message);
    throw new Error(
      "Failed to connect to the database. Please try again later"
    );
  }
};
