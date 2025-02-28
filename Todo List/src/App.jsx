import React, { useState } from "react";
import "./App.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const saveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex].text = editedTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  return (
    <div className="todo-container" style={{
      backgroundImage: "url('background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "93vh",
      minWidth: "97vw",
      padding: "20px"
    }}>
      <h2>Interactive Todo List</h2>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
       &nbsp;
        <button onClick={addTask} className="add-button">Add Task</button>
      </div>
      <br></br>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            {editingIndex === index ? (
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
            ) : (
              <span onClick={() => toggleComplete(index)}>{task.text}</span>
            )}
            <div className="buttons">
              {editingIndex === index ? (
                <button className="save-button" onClick={saveEdit}>Save</button>
              ) : (
               
                <button className="edit-button" onClick={() => startEditing(index)}>Edit</button>
              )}
               &nbsp;&nbsp;
              <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
              &nbsp;&nbsp;
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
