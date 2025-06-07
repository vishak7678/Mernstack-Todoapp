import { useEffect, useState } from "react";
import AddTask from "../components/dashboard/AddTask";
import Header from "../components/dashboard/Header";
import StackTitle from "../components/dashboard/StackTitle";
import YetToStart from "../components/dashboard/YetToStart";
import InProgress from "../components/dashboard/InProgress";
import Completed from "../components/dashboard/Completed";
import axios from "axios";
import EditTask from "../components/dashboard/EditTask";

const Dashboard = () => {
    const [addTaskDiv, setAddTaskDiv] = useState("hidden");
    const [Tasks, setTasks] = useState();
    const [editTask, setEditTask] = useState("hidden");
    const [editTaskId, setEditTaskId] = useState();
    useEffect(()=> {
         const fetchUserDetails = async () => {
          try {
            const res = await axios.get(
              "http://localhost:1000/api/v1/userDetails",
              {
                withCredentials: true,
              }
            );
            setTasks(res.data.tasks);
          } catch (error) {
            console.log(error);
          }
         };
         fetchUserDetails();
         if(window.sessionStorage.getItem("editTaskId"))
         {
          setEditTask("block");
          setEditTaskId(window.sessionStorage.getItem("editTaskId"))
         }
        
    },[addTaskDiv]);
    
  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTaskDiv}/>
      </div>
      <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h[89vh] mx-h-auto">
        <div className="w-1/3">
         <StackTitle title={"Yet To Start"}/>
         <div className="pt-2">
          {Tasks && <YetToStart task={Tasks[0].yetToStart}/>}
         </div>
        </div>
        <div className="w-1/3">
         <StackTitle title={"In Progress"}/>
         <div className="pt-2">
           {Tasks && <InProgress task={Tasks[1].inProgress}/>}
         </div>
       </div>
        <div className="w-1/3">
         <StackTitle title={"Completed"}/>
         <div className="pt-2">
           {Tasks && <Completed task={Tasks[2].completed}/>}
         </div>
        </div>
      </div>
       <div className= {`w-full ${addTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
      <div className= {`w-full ${addTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center` }>
        <AddTask setAddTaskDiv={setAddTaskDiv}/>
      </div>
       <div className= {`w-full ${editTask} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
      <div className= {`w-full ${editTask} h-screen fixed top-0 left-0 flex items-center justify-center` }>
        <EditTask editTaskId={editTaskId} setEditTask={setEditTask}/>
      </div>
    </div>
  );
};

export default Dashboard;
