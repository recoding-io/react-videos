import React, { useEffect, useState } from "react";
import ToDoList from "../components/ToDoList";
import ToDoInput from "../components/ToDoInput";

const ToDo = () => {
    const [todos, setTodos] = useState([]);

    const handleAddTodo = (todo) => {
        setTodos([...todos, todo])
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full p-4 m-4">
                <h1 className="text-4xl font-bold text-white text-center bg-slate-400 rounded-lg p-4 mb-2">
                    Gemini ToDo App
                </h1>
                <ToDoList todos={todos} />
                <ToDoInput handleAddTodo={handleAddTodo} />
            </div>
        </div>
    )
}

export default ToDo;