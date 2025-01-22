import { db } from "./firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export const getLanguages = async () => {
  try {
    const languageCollection = collection(db, "languages");
    const snapshot = await getDocs(languageCollection);
    const languages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return languages;
  } catch (error) {
    console.error("Error fetching languages:", error.message);
    throw new Error("Failed to connect to the database. Please try again later.");
  }
};