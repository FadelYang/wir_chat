import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const onForgetPassword = () => {

  }

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <form
          className="flex flex-col gap-5 border rounded py-5 px-10 shadow max-w-[356px]"
          onSubmit={onForgetPassword}
        >
          <div className="text-center text-xl font-medium">Recovery password form</div>
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
            <p className='text-xs text-gray-500'>Make sure you type right email, we will send recovery password link to your email</p>

          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className={`px-4 py-2 bg-black hover:bg-gray-800 text-white rounded ${
                isLoading ? "bg-gray-800" : ""
              } `}
            >
              {isLoading ? "Send email..." : "Send email"}
            </button>
            <Link
              to={"/login"}
              className="text-center text-black hover:text-gray-800"
              href="#"
            >
              Already know the password
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
