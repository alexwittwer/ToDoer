import "./input.css";
import {
  Content,
  Nav,
  Header,
  Title,
  ProjectModal,
  renderProject,
} from "./modules/TDRender";
import { Todo, Project } from "./modules/todo";
// html container
const container = document.querySelector(".container");
const todoContainer = Content();

// project storage
const projects = [];
const currentProject = null;

// populate page
container.appendChild(ProjectModal(projects));
container.appendChild(Title());
container.appendChild(Header());
container.appendChild(Nav());

// initial population

// testing
const project_1 = new Project("New Project");
const todo_1 = new Todo();
project_1.add(todo_1);
renderProject(project_1, todoContainer);

console.log(projects);

container.appendChild(todoContainer);

const testbutton = document.createElement("button");
testbutton.addEventListener("click", () => {
  console.log(projects);
});
container.appendChild(testbutton);
