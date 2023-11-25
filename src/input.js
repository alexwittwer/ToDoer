import "./input.css";
import { ProjectModal, TodoModal, editModal } from "./modules/TDRender";
import { Content, Header, Title, Nav } from "./modules/static";
import { returnProjects, updateLocalStorage } from "./modules/storage-manager";

// html container
const container = document.querySelector(".container");
const modals = document.createElement("div");
const todoContainer = Content();

// project storage
let projects = returnProjects();

// populate page
container.appendChild(modals);
container.appendChild(ProjectModal(projects));
container.appendChild(TodoModal(null));
modals.appendChild(editModal(null, null));
container.appendChild(Title());
container.appendChild(Header());
container.appendChild(Nav(projects));

// initial population
container.appendChild(todoContainer);

// cheap way to update the local storage
container.addEventListener("click", (e) => {
  updateLocalStorage(projects);
});
