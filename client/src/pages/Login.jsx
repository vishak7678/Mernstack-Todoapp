
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
     const navigate = useNavigate();
  const [Values, setValues] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
 const login = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(
            "http://localhost:1000/api/v1/login",
            Values,
           
            {
                withCredentials:true,
            }
           
        );
        console.log(res.data.success)
        localStorage.setItem("userLoggedIn", "yes");
        navigate("/dashboard");
    } catch (error) {
        alert(error.response.data.error);
      
    }
 }
  return (
     <div className="flex h-screen flex-col items-center justify-center">
        <div className="w-[60vw] md:w-[50vw] lg:w-[30vw]">
            <h1 className="text-3xl font-bold text-center mb-1 text-blue-800">
                Taskify
            </h1>
            <h3 className="text-center font-semibold text-xinc-900">Login with Taskify</h3>
        </div>
        <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
            <form className="flex flex-col gap-4">
                 <input 
                  type="email" 
                  placeholder="  email" 
                  required 
                  className="border rounded py-1 border-zinc-400 w-[100%] outline-none " 
                  name="email"
                  value={Values.email}
                  onChange={change}/> 
                 <input
                  type="password" 
                  placeholder="  password" 
                  required 
                  className="border rounded py-1 border-zinc-400 w-[100%] outline-none " 
                  name="password"
                  value={Values.password}
                  onChange={change}/>
                 <button className="bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300" 
                  onClick={login}>Login</button>
                    
                    <p className="text-center font-semibold text-gray-900">
                        Don't have an account? <Link to="/register" className="text-blue-500">SignUp</Link>
                    </p>
            </form>
        </div>
    </div>
  )
}

export default Login
