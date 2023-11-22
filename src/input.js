import "./input.css";
import { ProjectModal, TodoModal, editModal } from "./modules/TDRender";
import { Content, Header, Title, Nav } from "./modules/static";
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

/* const button = document.createElement("button");
button.textContent = "test button";
button.addEventListener("click", () => {
  console.log(projects);
});
container.appendChild(button);
 */
