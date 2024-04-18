import React, { useEffect, useState  } from 'react';
import Axios from 'axios';
import "./todo.css"
import TodoInput from './TodoInput'
import Todolist from './TodoList';


const Todo = () => {
  useEffect(() => {
    Axios.defaults.withCredentials = true;

    Axios.get('http://localhost:3001/list')
      .then(response => {
        console.log(response.data);
        console.log("Data fetched successfully");
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [listTodo, setListTodo] = useState([]);

  let addList = (inputText) => {
    if(inputText !== '')
      setListTodo([...listTodo, inputText]);
  }

  const deleteListItem = (key) => {
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo([...newListTodo]);
  }

  return (
    <div className='todo-container'>
        
      <div className='background-image'></div>
      <div className="main-container">
        <div className="center-container">
          <TodoInput addList={addList}/>
          
          <h1 className="app-heading">TODO</h1>
          <hr/>
          {listTodo.map((listItem, i) => (
            <Todolist key={i} index={i} item={listItem} deleteItem={deleteListItem}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
