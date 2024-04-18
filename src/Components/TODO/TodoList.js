import React from 'react';

function Todolist(props) {
    return (
   
       <li className="list-item">
            <div>
              {props.item.text}
              </div>
              <span className='icons'>
              {props.item.reminderDate}
              &nbsp;
                 {props.item.reminderTime}
              &nbsp;
                <i className="fa-solid fa-trash-can icon-delete" onClick={() => props.deleteItem(props.index)}></i>
            </span>
        </li>


 
    );
}

export default Todolist;

