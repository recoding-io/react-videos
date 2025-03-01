import React, { useState } from "react";

const ListItem = ({item}) => {
    const [isDone, setIsDone] = useState(item.idDone)

    const handleCheckboxChange = (e) => {
        setIsDone(e.target.checked)
    }

    return (
        <div className="w-full p-4">
            <li>
                <div className="flex gap-2">
                <input id={item.id} className="w-4 h-4 border-2 border-blue-500 rounded-sm bg-white mt-1 shrink-0" type="checkbox" onChange={handleCheckboxChange} checked={isDone} />
                <p className="text-lg font-medium" style={{ textDecoration: isDone ? 'line-through' : 'none' }}>
                    {item.title}
                </p>
                    </div> 
                <div className="flex w-full justify-between">
                    <div className="text-sm font-mono bg-yellow-200 rounded-lg p-1">
                    {item.date}
                    </div>
                    <div className="text-sm font-serif bg-slate-500 rounded-lg p-1 text-white">
                    {item.location}
                    </div>
                </div>
            </li>
        </div>
    )

}

export default ListItem