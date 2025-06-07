
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();
  const logout = async () => {
     try {
        const res = await axios.post("http://localhost:1000/api/v1/logout",
            {},
            {withCredentials:true}
        );
        alert(res.data.message);
        localStorage.clear("userLoggedIn");
        navigate("/login");
    } catch (error) {
        console.log(error);
       
    }
   }
  return (
    <div className='flex px-12 py-4 items-center justify-between border-b'>
      <div>
        <h1 className='text-2xl text-blue-800 font-semibold '>Taskify</h1>
      </div>
      <div className="flex gap-8">
            <button className="hover:text-blue-800 transition-all duration-300" onClick={() =>setAddTaskDiv("block")}>Add Task</button>
            <button className="text-2xl hover:text-red-600 transition-all duration-300" onClick={logout}>< IoLogOutOutline /></button>
      </div>
    </div>
  )
}

export default Header
