import "./input.css";
import Title from "./modules/title";
import Header from "./modules/header";
import Nav from "./modules/nav";
import Content from "./modules/content";
import { Todo, Project, addProject } from "./modules/todo";
import { TodoModal, ProjectModal } from "./modules/modal";

// local storage
Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
  return JSON.parse(this.getItem(key));
};

const container = document.querySelector(".container");

// initial population
container.appendChild(ProjectModal());
container.appendChild(TodoModal());
container.appendChild(Title());
container.appendChild(Header());
container.appendChild(Nav());
const todoContainer = Content();

// testing
const project_1 = new Project("New Project");
const todo_1 = new Todo();
todo_1.updateTodoStrings(
  "Watch Bob's Burgers",
  "Watch the latest episode of Bob's Burgers on Hulu"
);
todo_1.changePriority();
todo_1.markCompleted();
project_1.add(todo_1);
addProject(project_1, todoContainer);

console.log(project_1.todos[0]);

container.appendChild(todoContainer);

console.log(Nav());
