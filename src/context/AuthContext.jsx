import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        console.log({firebaseUser});

        if (userDocSnap.exists()) {
          const userDocSnapData = userDocSnap.data();
          const userData = { ...firebaseUser, role: userDocSnapData.role, email: userDocSnapData.email };
          setUser(userData);
        } else {
          setUser(firebaseUser); // At least set basic user data
        }
      } else {
        setUser(null);
      }
      setLoading(false); // Now the authentication check is complete
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, currentUserRole, setCurrentUserRole }}>
      {!loading ? children : <p>Loading...</p>} {/* Prevent showing app until auth is ready */}
    </AuthContext.Provider>
  );
}
