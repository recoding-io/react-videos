import React from "react";
import ListItem from "./ListItem";

const ToDoList = ({todos}) => {

    return (
        <div className="bg-gray-200 rounded-lg">
            <ul>
                {todos.map((item)=> (
                    <ListItem item={item} key={item.id} />
                ))}
            </ul>
        </div>
    )
}

export default ToDoList;