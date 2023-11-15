import { format } from "date-fns";

class Todo {
  constructor(
    title = "New todoer",
    description = "Add a description",
    priority = "High",
    due = format(new Date(), "MM/dd/yyyy")
  ) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.due = due;
    this.completed = false;
  }

  updateTodoStrings(newTitle, newDescription) {
    if (typeof newTitle === "string" && typeof newDescription === "string") {
      this.title = newTitle;
      this.description = newDescription;
    } else if (newTitle === null || newDescription === null) {
      throw new Error("Invalid arguments for updateTodoStrings");
    } else {
      throw new Error("Cannot add non-strings to title and description");
    }
  }
  changePriority() {
    this.priority === "High"
      ? (this.priority = "Low")
      : (this.priority = "High");
  }

  markCompleted() {
    this.completed == false
      ? (this.completed = true)
      : (this.completed = false);
  }

  deleteTodo() {}
}

export function addTodo(todo_arg) {
  const todoElem = document.createElement("div");
  const titleElem = document.createElement("div");
  const descriptionElem = document.createElement("div");
  const priorityElem = document.createElement("div");
  const dueElem = document.createElement("div");
  const completedElem = document.createElement("div");

  todoElem.classList.add("todo-item");

  titleElem.textContent = todo_arg.title;
  descriptionElem.textContent = todo_arg.description;
  priorityElem.textContent = todo_arg.priority;
  dueElem.textContent = todo_arg.due;
  completedElem.textContent = todo_arg.completed;

  completedElem.addEventListener((e) => {
    // TODO add logic here to toggle completed
  });

  dueElem.addEventListener((e) => {
    // TODO logic for date picker
  });

  const todo_elements = [
    titleElem,
    descriptionElem,
    priorityElem,
    dueElem,
    completedElem,
  ];
  todo_elements.forEach((e) => {
    e.classList.add("todo-param");
    todoElem.appendChild(e);
  });

  return todoElem;
}

export default Todo;
