import React, { useState } from 'react';

function TodoInput(props) {
    const [inputText, setInputText] = useState('');
    const [reminderDate, setReminderDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');

    const handleAddList = () => {
        if (inputText.trim() !== '') {
            const newItem = {
                text: inputText,
                reminderDate: reminderDate,
                reminderTime: reminderTime
            };
            props.addList(newItem);
            setInputText('');
            setReminderDate('');
            setReminderTime('');
        }
    }

    return (
      <><div className="Rem">Remainder Date & Time</div>
        <div className="input-container">
          
                <input
                    type="date"
                    className="timeset1"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                />
                <input
                    type="time"
                    className="timeset"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                />
            
          
            <input
                type="text"
                className="input-box-todo"
                placeholder="Enter your todo"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <button className="add-btn" onClick={handleAddList}>+</button>
        
        </div>
        </>
    );
}

export default TodoInput;

