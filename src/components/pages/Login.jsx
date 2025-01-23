import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col gap-5 border rounded py-5 px-10 shadow">
          <div className="text-center text-xl font-medium">Login Form</div>
          <div className="flex flex-col gap-1">
            <label
              className="block text-sm font-bold text-gray-700"
              htmlFor="language"
            >
              username
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="collectionFile"
              name="language"
              type="text"
              // disabled
              // value={selectedLanguage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
