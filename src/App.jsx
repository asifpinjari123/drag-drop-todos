import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./Components/TodoList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");

        setTodos(response.data.slice(0, 12));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTodos();
  }, []);

  // Function to move a card in the list
  const moveCard = (dragIndex, hoverIndex) => {
    const updatedTodos = [...todos];
    const [draggedTodo] = updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(hoverIndex, 0, draggedTodo);
    setTodos(updatedTodos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Todo List</h1>
        <TodoList todos={todos} moveCard={moveCard} />
      </div>
    </DndProvider>
  );
};

export default App;
