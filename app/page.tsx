"use client";
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import useSWR from 'swr';
import { TodoType } from './components/types';
import { useTodos } from './hooks/useTodo';



export default function Home() {
const {todos,isLoading,error}=useTodos();
  return (
    <main className='flex justify-center items-center h-screen flex-col bg-gray-200 min-h-screen py-2'>
      <h1 className='text-4xl font-bold text-gray-700 -mt-32'>Nextjs 13 Todo App</h1>
      <div className='w-full max-w-xl mt-5'>
        <div className='w-full px-8 py-6 bg-white shadow-md rounded-md'>
          <AddTask />
          <ul className='overflow-y-auto max-h-[500px]'>
            {todos?.map((todo:TodoType)=>(
              <TodoList todo={todo}/>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
