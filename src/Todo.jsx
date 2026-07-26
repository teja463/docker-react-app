import { useEffect, useState } from "react";

// const TODO_API_URL = "http://localhost:8080/todo";
const TODO_API_URL = "/api/todo";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(TODO_API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        const todoList = Array.isArray(data) ? data : [data];
        setTodos(todoList);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTodo = newTodo.trim();
    if (!trimmedTodo) {
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(TODO_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: trimmedTodo }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const createdTodo = await response.json();
      setTodos((prevTodos) => [createdTodo, ...prevTodos]);
      setNewTodo("");
    } catch (err) {
      setSubmitError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggleTodo(todo) {
    try {
      const response = await fetch(`${TODO_API_URL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todo.id,
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      await fetchTodos();
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  async function fetchTodos() {
    try {
      const response = await fetch(TODO_API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      const todoList = Array.isArray(data) ? data : [data];
      setTodos(todoList);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <p>Loading todos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>TODO App</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Enter a todo"
          maxLength={200}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {submitError ? <p className="error">{submitError}</p> : null}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id ?? `${todo.todo}-${todo.completed}`}
            className="todo-item"
            onClick={() => handleToggleTodo(todo)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleToggleTodo(todo);
              }
            }}
          >
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.todo}
            </span>
            <span className={todo.completed ? "completed" : "pending"}>
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Todo;
