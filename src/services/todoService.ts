import type { Todo } from "../types/Todo.js";
import { saveTodos } from "./fileService.js";

export function addTodo(todos: Todo[], title: string): Todo[] {
  const newTodo: Todo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    title,
    completed: false,
  };

  const updated = [...todos, newTodo];
  saveTodos(updated);

  console.log("✅ Todo added!");
  return updated;
}

export function toggleTodo(todos: Todo[], id: number): Todo[] {
  const updated = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

  saveTodos(updated);
  console.log("🔄 Todo updated!");
  return updated;
}

export function deleteTodo(todos: Todo[], id: number): Todo[] {
  const updated = todos.filter(t => t.id !== id);

  saveTodos(updated);
  console.log("🗑️ Todo deleted!");
  return updated;
}