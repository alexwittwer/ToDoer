import { format } from "date-fns";

class Project {
  constructor(projectName = "New Project", ...args) {
    this.project = projectName;
    this.id = Date.now();
    this.todos = [...args];
  }

  add(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new Error("Error: argument is not a Todo item");
    }
  }
  delete(todo) {
    if (todo instanceof Todo) {
      const index = this.todos.indexOf(todo);
      if (index !== -1) {
        this.todos.splice(index, 1);
      } else {
        throw new Error("Error: argument is not in Todo list");
      }
    } else {
      throw new Error("Error: argument is not a Todo item");
    }
  }
}
class Todo {
  constructor(
    title = "New todoer",
    description = "Add a description",
    priority = "High",
    due = format(new Date(), "MM/dd/yyyy"),
    todoID = null
  ) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.due = due;
    this.completed = false;
    this.todoID = crypto.randomUUID();
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
    this.completed === false
      ? (this.completed = true)
      : (this.completed = false);
  }
}

export function addProject(project_arg, container) {
  project_arg.todos.forEach((todo) => {
    container.appendChild(addTodo(todo));
  });
}

function addTodo(todo_arg) {
  const todoElem = document.createElement("div");
  const titleElem = document.createElement("div");
  const descriptionElem = document.createElement("div");
  const priorityElem = document.createElement("div");
  const dueElem = document.createElement("div");
  const completedElem = document.createElement("input");
  const completedElemLabel = document.createElement("label");
  const id = Math.floor(Math.random() * Date.now());

  completedElem.type = "checkbox";
  completedElem.id = id;
  completedElemLabel.setAttribute("for", id);
  completedElemLabel.textContent = "Mark Complete: ";
  completedElemLabel.appendChild(completedElem);

  todoElem.classList.add("todo-item");

  titleElem.textContent = todo_arg.title;
  descriptionElem.textContent = todo_arg.description;
  priorityElem.textContent = todo_arg.priority;
  dueElem.textContent = todo_arg.due;
  completedElem.checked = todo_arg.completed;

  const todo_elements = [
    titleElem,
    descriptionElem,
    priorityElem,
    dueElem,
    completedElemLabel,
  ];
  todo_elements.forEach((e) => {
    e.classList.add("todo-param");
    todoElem.appendChild(e);
  });

  return todoElem;
}

export { Project, Todo };
