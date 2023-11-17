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

  checkPriority(input) {
    if (input === "on") {
      this.priority = "High";
    } else {
      this.priority = "Low";
    }
  }

  markCompleted() {
    this.completed === false
      ? (this.completed = true)
      : (this.completed = false);
  }
}

export { Project, Todo };
