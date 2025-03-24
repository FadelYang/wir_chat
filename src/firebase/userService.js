import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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

export const getUserByEmail = async (email) => {
  const users = await getUsers();
  const userWithEmail = users.map(item => item.email);
  const isUserExists = userWithEmail.includes(email);
  return isUserExists
}

export const getLoggedUserRole = async () => {
  const loggedUser = auth.currentUser;
  const loggedUserUid = loggedUser.uid;
  const loggedUserData = (await getDoc(doc(db, "users", loggedUserUid))).data();

  return loggedUserData.role
}

export const registerUser = async (email, password, role, adminPassword) => {
  try {
    const currentAdmin = auth.currentUser;
    if (!currentAdmin) throw new Error("Admin not logged in");

    const credential = EmailAuthProvider.credential(currentAdmin.email, adminPassword);
    await reauthenticateWithCredential(currentAdmin, credential);

    const createdUser = await createUserWithEmailAndPassword(auth, email, password);
    const uid = createdUser.user.uid

    await setDoc(doc(db, "users", createdUser.user.uid), {
      email,
      role,
      createdAt: new Date(),
      is_active: true
    });

    await signOut(auth);

    await signInWithEmailAndPassword(auth, currentAdmin.email, adminPassword);
    window.location.href = "/dashboard/users"
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw new Error(error.message || "User creation failed.");
  }
};
