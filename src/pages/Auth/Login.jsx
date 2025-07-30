import React, {useContext, useState} from 'react';
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate ,Link } from 'react-router-dom';
import Input from '../../components/layouts/Input/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  //Handle Login Form Submit
  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!validateEmail(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (!password) {
    setError("Please enter the password");
    return;
  }

  try {
    // 1. Login and get token
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });

    const { token } = response.data;

    if (token) {
      // 2. Save token
      localStorage.setItem("token", token);

      //  3. Fetch fresh user info (with correct image URL)
      const userRes = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      updateUser(userRes.data); //  This now has correct profileImageUrl

      // 4. Navigate to dashboard
      navigate("/dashboard");
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
};


  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="abc@example.com" type="text" />
           <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 Characters" type="password" />

           {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
           <button type="submit" className="btn-primary">
            LOGIN
           </button>

          <p className="text-[13px] text-slate-800 mt-3">
             Don't have an account?{" "}
             <Link className="font-medium text-purple-700 underline" to="/signup">
              SignUP
             </Link>
          </p>
        </form>

      </div>
    </AuthLayout>
  )
}

export default Login
