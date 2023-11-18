import "./input.css";
import {
  Content,
  Nav,
  Header,
  Title,
  ProjectModal,
  TodoModal,
} from "./modules/TDRender";
import { Todo, Project } from "./modules/todo";
// html container
const container = document.querySelector(".container");
const todoContainer = Content();

// project storage
const projects = [];
const currentProject = null;

// populate page
container.appendChild(ProjectModal(projects, currentProject));
container.appendChild(TodoModal(currentProject));
container.appendChild(Title());
container.appendChild(Header());
container.appendChild(Nav());

// initial population

// testing

console.log(projects);

container.appendChild(todoContainer);
