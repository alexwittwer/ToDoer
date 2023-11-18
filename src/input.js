import "./input.css";
import { ProjectModal, TodoModal } from "./modules/TDRender";
import { Content, Header, Title, Nav } from "./modules/static";
// html container
const container = document.querySelector(".container");
const todoContainer = Content();

// project storage
const projects = [];

// populate page
container.appendChild(ProjectModal(projects));
container.appendChild(TodoModal(currentProject));
container.appendChild(Title());
container.appendChild(Header());
container.appendChild(Nav());

// initial population

// testing

console.log(projects);

container.appendChild(todoContainer);

// add test button

const button = document.createElement("button");
button.textContent = "test button";
button.addEventListener("click", () => {
  console.log(currentProject);
  console.log(projects);
});
container.appendChild(button);
