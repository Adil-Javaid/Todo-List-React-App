// src/components/TodoApp.tsx
import React, { useState, useEffect } from "react";
import "./style.css";

interface Task {
  id: number;
  text: string;
  checked: boolean;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() === "") {
      alert("You must write something!");
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      text: inputValue,
      checked: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputValue("");
  };

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>
          To-Do List
        </h2>
        <div className="row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add your text"
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul id="list-container">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.checked ? "checked" : ""}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
              <span onClick={() => removeTask(task.id)}>&times;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
