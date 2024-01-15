import { createSlice } from "@reduxjs/toolkit";



const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            const newTask = { id: Date.now(), title: action.payload, done: false };
            state.push(newTask);
        },
        deleteTask: (state, action) => {
            const updatedTask = state.filter((task, index) => index !== action.payload);
            return updatedTask;
        },
        completeTask: (state, action) => {
            const task = state.find((task, index) => index === action.payload);
            if (task) {
                task.done = !task.done;
            }
        },
        setTasks: (state, action) => {
            return action.payload;
        }
    }
});

export const { addTask, deleteTask, completeTask, setTasks } = todoSlice.actions;

export default todoSlice.reducer;
