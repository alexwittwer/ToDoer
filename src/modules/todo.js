import { addWeeks, isWithinInterval, format } from "date-fns";

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
    due = new Date(),
    id = crypto.randomUUID()
  ) {
    this.title = title;
    this.description = description;
    this.priority = this.checkPriority(priority);
    this.due = due;
    this.completed = false;
    this.todoID = id;
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
  changePriority(priority) {
    priority === "High" ? (this.priority = "Low") : (this.priority = "High");
  }

  checkPriority(input) {
    if (input === true) {
      return "High";
    } else {
      return "Low";
    }
  }

  markCompleted() {
    this.completed === false
      ? (this.completed = true)
      : (this.completed = false);
  }

  edit(title = null, description = null, due = null, priority = null) {
    this.title = title;
    this.description = description;
    this.due = due;
    this.priority = this.checkPriority(priority);
  }
}

export { Project, Todo };
