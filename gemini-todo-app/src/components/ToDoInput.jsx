import React, { useState } from 'react'
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import { type } from '@testing-library/user-event/dist/type'
const ToDoInput = ({handleAddTodo}) => {
    const [inputText, setInputText] = useState('')
    const key = process.env.REACT_APP_GEMINI_API_KEY

    const googleAI = new GoogleGenerativeAI(key)

    const schema = {
        description: 'List of items for to do list it includes a title for todo which is things that person has to do and id which is type of unique id generated random and has to be unique, and may include date and location also, it location and date is not provided return as empty string',
        type: SchemaType.ARRAY,
        items: {
            type: SchemaType.OBJECT,
            properties: {
                id: {
                    type: SchemaType.NUMBER,
                    description: 'Unique identifier for the todo item',
                    nullable: false
                },
                title: {
                    type: SchemaType.STRING,
                    description: 'Title of the todo item'
                },
                date: {
                    type: SchemaType.STRING,
                    description: 'Date of the todo item, I want the date to be in the format YYYY-MM-DD. If no date is provided, return an empty string'
                },
                location: {
                    type:SchemaType.STRING,
                    description: 'Location of the todo item, If no location is provided, return an empty string'
                }
            },
            required: ['id', 'title']
        }
    }

    const model = googleAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema
        }
    })

    const handleInputChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            const result = await model.generateContent(inputText)
            var todoItems = result.response.text()
            todoItems = todoItems.replace("[","").replace("]","")
            todoItems = JSON.parse(todoItems)
            handleAddTodo({
                id: todoItems.id,
                title: todoItems.title,
                isDone: false,
                date: todoItems.date,
                location: todoItems.location
            })
            setInputText('');
        } catch (error){
            console.log(error);
            alert('An error occurred while generating the todo item')
        }
        
    }

    return (
        <div className='flex'>
            <input className='rounded-lg w-full text-gray-600 text-lg pl-2 mt-2' placeholder='Make your todo smarter with Gemini ...' value={inputText} onChange={handleInputChange} />
            <button className='bg-blue-500 rounded-lg p-2 m-4 text-white text-xl font-bold' onClick={handleSubmit}>Add</button>
        </div>
    )
}

export default ToDoInput