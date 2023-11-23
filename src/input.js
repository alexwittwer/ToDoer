import "./input.css";
import { ProjectModal, TodoModal, editModal } from "./modules/TDRender";
import { Content, Header, Title, Nav } from "./modules/static";
import { returnProjects, saveProjects } from "./modules/storage-manager";

// html container
const container = document.querySelector(".container");
const modals = document.createElement("div");
const todoContainer = Content();

document.body.appendChild(modals);

// project storage
const projects = [];

// populate page
container.appendChild(ProjectModal(projects));
container.appendChild(TodoModal(null));
modals.appendChild(editModal(null, null));
container.appendChild(Title());
container.appendChild(Header());
container.appendChild(Nav(projects));

// initial population

container.appendChild(todoContainer);

// add test button

const button = document.createElement("button");
button.textContent = "test button";
button.addEventListener("click", () => {
  saveProjects(projects);
});
container.appendChild(button);

const returnButton = document.createElement("button");
returnButton.textContent = "test button 2";
returnButton.addEventListener("click", () => {
  const savedProjects = returnProjects();
  console.log(savedProjects);
});
container.appendChild(returnButton);
