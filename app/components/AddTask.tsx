import React, { useRef } from 'react';
import { useTodos } from '../hooks/useTodo';
import { API_URL } from '@/constants/url';

function AddTask() {
    const inputRef=useRef<HTMLInputElement|null>(null);
    const {todos,isLoading,error,mutate}=useTodos();
    const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(inputRef.current?.value=="")return
   const response=await fetch(`${API_URL}/createTodo`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({title:inputRef.current?.value,isCompleted:false
    }),
   });
   if(response.ok){
    const newTodo=response.json();
    mutate([...todos,newTodo]);
    inputRef.current!.value="";
   }
    }
  return (
    <form className='mb-4  flex items-center' onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" className='border w-5/6 px-4 py-2 rounded-lg focus:border-blue-400'/>
        <button className=' px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400 hover:scale-95 transform duration-300 w-1/6 ml-1'>Add</button>
    </form>
  )
}

export default AddTask