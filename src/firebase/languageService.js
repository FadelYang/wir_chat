import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

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
    throw new Error(
      "Failed to connect to the database. Please try again later."
    );
  }
};

export const updateSelectedCollection = async (
  language,
  newSelectedCollection
) => {
  const docRef = doc(db, "languages", language);
  await updateDoc(docRef, { selected_collection: newSelectedCollection });
};

export const getLanguageByLanguageCode = async (languageCode) => {
  const collectionRef = collection(db, "languages");
  const q = query(collectionRef, where("language_code", "==", languageCode));
  const querySnapshot = await getDocs(q);
  const language = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return language;
};

export const getSelectedCollection = async (languageCode) => {
  const data = await getLanguageByLanguageCode(languageCode)
  return data[0].selected_collection
}
