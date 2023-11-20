import Logo from "../assets/todo-title.svg";
import { dueThisWeek, dueNextWeek } from "./TDRender";

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
    dueThisWeek(projectsArr);
  });
  nextWeek.addEventListener("click", () => {
    dueNextWeek(projectsArr);
  });

  addProject.addEventListener("click", (e) => {
    const selector = document.querySelector(".project-modal"); // necessary coupling
    e.preventDefault();
    selector.classList.toggle("hidden");
  });

  navitems.forEach((element) => {
    nav.appendChild(element);
  });

  return nav;
}

// Renders the title screen
export function Title() {
  const container = document.createElement("div");
  const title_1 = document.createElement("h1");
  const title_2 = document.createElement("h1");

  container.classList.add("section-container-title");
  title_1.classList.add("title", "title-one");
  title_2.classList.add("title", "title-two");

  title_1.textContent = "To";
  title_2.textContent = "Doer//";

  container.appendChild(title_1);
  container.appendChild(title_2);

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
