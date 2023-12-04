import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import SaveIcon from '@mui/icons-material/Save';
import { TodoType } from './types';
import { useTodos } from '../hooks/useTodo';
import { API_URL } from '@/constants/url';


type todoProps = {
    todo: TodoType
}
function TodoList({ todo }: todoProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditidTitle] = useState<string>(todo.title||'');
    const{todos,isLoading,error,mutate}=useTodos();
    

    const handleEdit = async(id:number) => {
        setIsEditing(!isEditing);
        if(isEditing){
            const response= await fetch(`${API_URL}/editTodo/${todo.id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({title:editedTitle
                }),
               });
               if(response.ok){
                const editTodo=await response.json();
               const editTodos=todos.filter((todo:TodoType)=>todo.id===id?editTodo:todo);
               mutate(editTodos);
               }
        }
    };

    const handleDelete=async(id:number)=>{
            const response= await fetch(`${API_URL}/deleteTodo/${todo.id}`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
               });
               if(response.ok){
                const deleteTodo=await response.json();
                const updateTodos=todos.filter((todo:TodoType)=>todo.id!==id);
                mutate(updateTodos);
               }    
    }

    const toggleTodoCompletion=async(id:number,isCompleted:boolean)=>{
        const response= await fetch(`${API_URL}/editTodo/${todo.id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({isCompleted:!isCompleted
            }),
           });
           if(response.ok){
            const editTodo=await response.json();
           const editTodos=todos.filter((todo:TodoType)=>todo.id===id?editTodo:todo);
           mutate(editTodos);
           }
    }

    return (
        <li className='flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow mt-4'>
            <div className='flex items-center'>
                <input onChange={()=>toggleTodoCompletion(todo.id,todo.isCompleted)} type="checkbox" name="todo1" id="todo1" className='  border border-gray-400 w-4 h-4 mr-1' />
                <label htmlFor="">
                    {isEditing ? (
                        <input type='text' onChange={e => setEditidTitle(e.target.value)} value={editedTitle} className='border rounded py-2 px-1' />
                    ) : (
                        <span   className={`text-lg font-mediun mr-2  ${todo.isCompleted?`line-through`:``}`}>{todo.title}</span>
                    )}
                </label>
            </div>
            <div>
                <button onClick={()=>handleEdit(todo.id)}>{isEditing ? (
                    <SaveIcon sx={{ color: "green", ":hover": { color: "#0e300f" } }} />
                ) : (
                    <CreateIcon sx={{ color: "green", ":hover": { color: "#0e300f" } }} />
                )}</button>
                <button><DeleteIcon onClick={()=>handleDelete(todo.id)} sx={{ color: "red", ":hover": { color: "#c456c4" } }} /></button>
            </div>

        </li>

    )
}

export default TodoList