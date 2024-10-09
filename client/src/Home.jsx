import React from "react";
import Create from "./Create";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from "react-icons/bs";


function Home() {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const url = 'http://localhost:3003';

  const getTodoList = () => {
    axios
      .get(`${url}/all-tasks`)
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getTodoList()
  }, [refresh]);

 const handleRefresh = () => {
    setRefresh(!refresh);
  } 

  const handleRemoveTask = (id) => {
    axios.delete(`${url}/delete-task/${id}`)
      .then(result => {
        /// location.reload();
        console.log(result.data)
      })
      .catch(err => console.log(err));

   handleRefresh();
  };

  const handleEdit = (id, index) => {

    axios.put(`${url}/update-task/${id}`, {
      done: !todos[index].done
    })
      .then(result => {
        console.log(result.data)
      
      })
      .catch(err => console.log(err));

   getTodoList();


  };

  return (
    <div className="home">

      <h2 className="todo-h2">Todo List</h2>

      <Create getTodoList={handleRefresh} />

      <div className="item-container">

        {todos && todos.length > 0 ? (
          todos.map((todo, taskIndex) => (
            <div key={todo._id} className="todo-item">

              <div  onClick={() => handleEdit(todo._id, taskIndex)}>
                {
                  todo.done ?
                  <BsFillCheckCircleFill />
                    : <BsCircleFill />
                }
               
                <p className={todo.done ? "checked" : "unchecked"}> {todo.task} </p>
              </div>

              <span>
                <BsFillTrashFill onClick={() => handleRemoveTask(todo._id)} className="trash" />
              </span>

            </div>
          ))
        ) : (
          <div className="empty-todo">Todo list is empty!!!</div>
        )}
      </div>
    </div>
  );
}

export default Home;
