import * as readline from "node:readline";
import { addTodo, toggleTodo, deleteTodo } from "../services/todoService.js";
import { loadTodos } from "../services/fileService.js";
import type { Todo } from "../types/Todo.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let todos: Todo[] = loadTodos();

function renderTodos(): void {
  console.log("\n--- TODOS ---");

  if (todos.length === 0) {
    console.log("📭 No todos yet");
    return;
  }

  todos.forEach(todo => {
    const status = todo.completed ? "✅" : "❌";
    console.log(`${todo.id}. ${status} ${todo.title}`);
  });
}

export function startCLI(): void {
  renderTodos();

  console.log("\n--- MENU ---");
  console.log("1. Add Todo");
  console.log("2. Toggle Todo");
  console.log("3. Delete Todo");
  console.log("4. Exit");

  rl.question("Choose an option: ", (option) => {
    switch (option) {
      case "1":
        rl.question("Enter todo title: ", (title) => {
          todos = addTodo(todos, title);
          startCLI();
        });
        break;

      case "2":
        rl.question("Enter todo id: ", (id) => {
          const parsedId = Number(id);

          if (isNaN(parsedId)) {
            console.log("❌ Invalid ID");
            return startCLI();
          }

          todos = toggleTodo(todos, parsedId);
          startCLI();
        });
        break;

      case "3":
        rl.question("Enter todo id: ", (id) => {
          const parsedId = Number(id);

          if (isNaN(parsedId)) {
            console.log("❌ Invalid ID");
            return startCLI();
          }

          todos = deleteTodo(todos, parsedId);
          startCLI();
        });
        break;

      case "4":
        console.log("👋 Goodbye!");
        rl.close();
        break;

      default:
        console.log("❌ Invalid choice");
        startCLI();
    }
  });
}