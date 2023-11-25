/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
export default class Todo {
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
    }
    return "Low";
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
