import React, { useState } from "react";

interface Todo {
  id: number;
  task: string;
  completed: boolean; // New property to track completion status
}

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  // Function to add a new task
  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newTask: Todo = {
      id: Date.now(), // unique id based on timestamp
      task: newTodo,
      completed: false, // New tasks are not completed by default
    };

    setTodos([...todos, newTask]);
    setNewTodo(""); // Clear input field after adding
  };

  // Function to delete a task
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to toggle the completed status of a task
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Simple To-Do List</h2>

          {/* Input Field for New Task */}
          <div className="flex mb-4">
            <input
              type="text"
              className="border rounded-lg p-2 w-full mr-2"
              placeholder="Add new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* Display the To-Do List */}
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center p-2 border-b"
              >
                {/* Checkbox to toggle completion */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="mr-2"
                  />
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.task}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
