/* eslint-disable no-undef */
import "./input.css";
// eslint-disable-next-line import/extensions
import { ProjectModal, TodoModal, editModal } from "./modules/ModalRenders";
import { Content, Header, Title, Nav } from "./modules/static";
import { returnProjects, updateLocalStorage } from "./modules/storage-manager";

// html container
const container = document.querySelector(".container");
const modals = document.createElement("div");
const todoContainer = Content();

// project storage
const projects = returnProjects();

// populate page
document.body.appendChild(modals);
modals.appendChild(ProjectModal(projects));
modals.appendChild(TodoModal(null));
modals.appendChild(editModal(null, null));
container.appendChild(Title());
container.appendChild(Header());
container.appendChild(Nav(projects));

// initial population
container.appendChild(todoContainer);

// cheap way to update the local storage
container.addEventListener("click", (e) => {
  e.preventDefault();
  updateLocalStorage(projects);
});
