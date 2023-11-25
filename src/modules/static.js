/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import Logo from "../assets/todo-title.svg";
import {
  dueThisWeek,
  dueNextWeek,
  killChildren,
  createProjectElement,
} from "./TDRender";
import { renderTodo } from "./ModalRenders";

// Renders the navigation pane
export function Nav(projectsArr) {
  const nav = document.createElement("section");
  const thisWeek = document.createElement("nav");
  const nextWeek = document.createElement("nav");
  const projects = document.createElement("section");
  const addProject = document.createElement("button");

  const navelements = [thisWeek, nextWeek, projects];
  const navitems = [thisWeek, nextWeek, projects, addProject];

  nav.classList.add("nav-section");
  navelements.forEach((element) => {
    element.classList.add("nav-item");
  });
  addProject.classList.add("add-project-button");
  projects.classList.add("projects-nav");

  thisWeek.textContent = "This week";
  nextWeek.textContent = "Next week";
  projects.textContent = "Projects";
  addProject.textContent = "Add project";

  thisWeek.classList.add("this-week");
  nextWeek.classList.add("next-week");

  thisWeek.addEventListener("click", () => {
    const contentWindow = document.querySelector(".content-section");
    killChildren(contentWindow);
    const thisWeekTodos = dueThisWeek(projectsArr);
    thisWeekTodos.forEach((todo) => {
      const thisWeekTodoElement = renderTodo(todo, null);
      contentWindow.appendChild(thisWeekTodoElement);
    });
  });
  nextWeek.addEventListener("click", () => {
    const contentWindow = document.querySelector(".content-section");
    killChildren(contentWindow);
    const nextWeekTodos = dueNextWeek(projectsArr);
    nextWeekTodos.forEach((todo) => {
      const nextWeekTodoElement = renderTodo(todo, null);
      contentWindow.appendChild(nextWeekTodoElement);
    });
  });

  addProject.addEventListener("click", (e) => {
    const selector = document.querySelector(".project-modal"); // necessary coupling
    e.preventDefault();
    selector.classList.toggle("hidden");
  });

  navitems.forEach((element) => {
    nav.appendChild(element);
  });

  // populate projects

  if (projectsArr) {
    projectsArr.forEach((item) => {
      createProjectElement(item, projects);
    });
  }

  return nav;
}

// Renders the title screen
export function Title() {
  const container = document.createElement("div");
  const title1 = document.createElement("h1");
  const title2 = document.createElement("h1");

  container.classList.add("section-container-title");
  title1.classList.add("title", "title-one");
  title2.classList.add("title", "title-two");

  title1.textContent = "To";
  title2.textContent = "Doer//";

  container.appendChild(title1);
  container.appendChild(title2);

  return container;
}

// Renders the header
export function Header() {
  const header = document.createElement("header");
  const title = document.createElement("h3");
  const logo = new Image();

  title.textContent = "ToDoer //";

  logo.src = Logo;
  logo.classList.add("logo");
  header.classList.add("section-header");
  title.classList.add("app-title");

  header.appendChild(title);
  header.appendChild(logo);

  return header;
}

export function Content() {
  if (!document.querySelector(".content-section")) {
    const content = document.createElement("section");
    content.classList.add("content-section");

    return content;
  }
}
