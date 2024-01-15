import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, completeTask, deleteTask } from "../redux/todoReducer";
import useFetch from "../redux/apiCall";


const TaskContainer = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.todos);
    const {initData} = useFetch()

    
    const [task, setTask] = useState("");
    const [modal, setModal] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  
    const handleCreateNew = () => {
      dispatch(addTask(task));
      setTask("");
    };
  
    const handleDelete = (taskId) => {
      setTaskIdToDelete(taskId);
      setModal(true);
    };
  
    const confirmDelete = () => {
      if (taskIdToDelete !== null) {
        dispatch(deleteTask(taskIdToDelete));
        setModal(false);
      }
    };
    const handleComplete = (taskId) => {
        dispatch(completeTask(taskId));
    };

    // useEffect(() => {
    //     UseFetch()
    // }, [dispatch]);

    return (
        <div className="w-[300px] min-h-[500px] border m-auto mt-[10%] p-3 rounded-lg relative">
            <h1 className="text-xl mb-5">Simple Todo</h1>
            <div className="flex flex-col gap-3">
                {tasks?.map((task, index) => (
                    <div key={index} className="flex justify-start gap-3">
                        <input type="checkbox" checked={task.done} onChange={() => handleComplete(index)} />
                        <span>{task.title}</span>

                        <div className="ml-auto flex flex-row gap-2">
                        {
                            task?.done && <div className="text-[red] text-xl "> ✔ </div>

                        }
                        <button onClick={() => handleDelete(index)} className="text-[red] text-xl w-[min-content] ">x</button>
                  
                        </div>
               </div>
                ))}
            </div>

            <div className="absolute bottom-0 p-3">
                <input type='text' name='task' value={task} onChange={(e) => setTask(e.target.value)} className="border p-2 w-full" />
                <button onClick={handleCreateNew} className="bg-[blue] text-white p-2 rounded-md mt-3">
                    Create new task
                </button>
            </div>


            {modal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-md">
                        <p>Confirm delete?</p>
                        <div className="flex justify-end mt-3">
                            <button
                                onClick={() => setModal(false)}
                                className="bg-gray-400 p-2 mr-2 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white p-2 rounded-md"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div >
    );
};

export default TaskContainer;
