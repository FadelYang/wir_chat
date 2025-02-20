import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const userData = userCredential.user;

      // Fetch user role data
      const userDocRef = doc(db, "users", userData.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userDocSnapData = userDocSnap.data();
        navigate("/dashboard");
        setError(false);
        setUser({ ...user, role: userDocSnapData.role });
        console.log({ user });
      } else {
        throw new Error("User data not found in Firestore");
      }
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      const errorMessage = error.message;
      setError(true);
      if (errorMessage == "Firebase: Error (auth/too-many-requests).") {
        setErrorMessage(
          "Terlalu banyak percobaan, silahkan coba lagi beberapa saat"
        );
      } else {
        setErrorMessage("Email atau password salah");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <form
          className="flex flex-col gap-5 border rounded py-5 px-10 shadow"
          onSubmit={onLogin}
        >
          <div className="text-center text-xl font-medium">Login Form</div>
          <div className="flex flex-col gap-2">
            <label
              className="block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex flex-col gap-1">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Passoword
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="passwrd"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <div className="text-wrap text-sm font-medium text-red-500 max-w-[274px]">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className={`px-4 py-2 bg-black hover:bg-gray-800 text-white rounded ${
                isLoading ? "bg-gray-800" : ""
              } `}
            >
              {isLoading ? "Login..." : "Login"}
            </button>
            <Link to={"/forgot-password"} className="text-center text-black hover:text-gray-800" href="#">
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
