import { useState,useRef } from "react";
import Modal from "./Modal";
export default function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState('');
  function handleChange(event) {
    setEnteredTask(event.target.value);
  }
  const modal = useRef()

  function handleOnClick(){
    if(enteredTask.trim() === ''){
        modal.current.open()
        return
    }
    onAdd(enteredTask)
    setEnteredTask('')
  }

  return (
    <>
    <Modal buttonName="Close" ref={modal} >
    <h2 className=" text-xl font-bold text-stone-100 my-4">Empty Value.</h2>
    <p className=" text-stone-100 mb-4">Oops... looks like you forgot to enter a value.</p>
    <p className=" text-stone-100 mb-4">Please make sure you are able to provide a valid value.</p>
    </Modal>
    <div className="flex items-center gap-4">
      <input
        onChange={handleChange}
        className=" w-64 px-4 py-1 rounded-sm bg-stone-200"
        type="text"
        value={enteredTask}
      ></input>
      <button onClick={handleOnClick} className=" text-stone-700 hover:text-stone-950">
        Add Task
      </button>
    </div>
    </>
  );
}
