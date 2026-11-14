import * as fs from "node:fs";
import type { Todo } from "../types/Todo.js";

const FILE_PATH = "./todos.json";

export function saveTodos(todos: Todo[]): void {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}

export function loadTodos(): Todo[] {
  if (fs.existsSync(FILE_PATH)) {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
  }
  return [];
}