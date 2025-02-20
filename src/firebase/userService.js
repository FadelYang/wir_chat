import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

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
