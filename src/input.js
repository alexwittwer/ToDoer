import "./input.css";
import Title from "./modules/title";
import Header from "./modules/header";
import Nav from "./modules/nav";
import Content from "./modules/content";
import { Todo, Project, addProject } from "./modules/todo";
import { TodoModal, ProjectModal } from "./modules/modal";

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
project_1.add(todo_1);
addProject(project_1, todoContainer);

container.appendChild(todoContainer);

console.log(Nav());
