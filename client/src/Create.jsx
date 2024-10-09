import React from "react";
import { useState } from "react";
import axios from "axios";

function Create({getTodoList}) {
  const [task, setTask] = useState("");


  const handleAddTodoList = () => {

    axios
      .post("http://localhost:3003/add", { task: task })
      .then((res) => {
       console.log(res.data);
       // location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

   getTodoList();

    setTask("");
  };
  return (
    <div className="createForm">
      <input
        type="text"
        name=""
        value={task}
        placeholder="Enter task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAddTodoList}>Add</button>
    </div>
  );
}

export default Create;
