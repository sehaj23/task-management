import Button from "./Button";
import Modal from "./Modal";
import Input from "./input";
import { useRef } from "react";
export default function ProjectForm({ onAddProject,onCancel }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const modal = useRef()
  function handleSave() {
    const projectData = {
      title: title.current.value,
      description: description.current.value,
      dueDate: dueDate.current.value,
    };
    if(projectData.title.trim() === '' || projectData.description.trim()==='' || projectData.dueDate.trim()==='' ){
        modal.current.open()
    }
    onAddProject(projectData);
  }

  return (
    <>
    <Modal buttonName="Close" ref={modal} >
    <h2 className=" text-xl font-bold text-stone-100 my-4">Invalid Input.</h2>
    <p className=" text-stone-100 mb-4">Oops... looks like you forgot to enter a value.</p>
    <p className=" text-stone-100 mb-4">Please make sure you are able to provide a valid value for every input field.</p>
    </Modal>
    <div className="w-[35rem] mt-16">
      <menu className=" flex items-center justify-end gap-4 my-4">
        <li>
          <button onClick={onCancel} className=" text-stone-400 hover: text-stone-950">
            Cancel
          </button>
        </li>
        <li>
          <Button onClick={handleSave}>Save</Button>
        </li>
      </menu>
      <div></div>
      <Input ref={title} label={"Title: "} />
      <Input ref={description} label={"Description: "} textarea={true} />
      <Input ref={dueDate} label={"Due Date: "} props={{ type: "date" }} />
    </div>
    </>
  );
}
