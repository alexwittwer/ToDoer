export default class Project {
  constructor(projectName = "New Project", ...args) {
    this.project = projectName;
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
