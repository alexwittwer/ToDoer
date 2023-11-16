import "./input.css";
import {
  Content,
  Nav,
  Header,
  Title,
  ProjectModal,
  TodoModal,
} from "./modules/TDRender";
import { Todo, Project, addProject } from "./modules/todo";

const projects = [];

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
projects.push(project_1);
const todo_1 = new Todo();
project_1.add(todo_1);
addProject(project_1, todoContainer);

console.log(projects);

container.appendChild(todoContainer);
