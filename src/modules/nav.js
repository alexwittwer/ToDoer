import { ProjectModal } from "./modal";
import { Project } from "./todo";
import Content from "./content";

export default function Nav() {
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

  addProject.addEventListener("click", (e) => {
    const selector = document.querySelector(".project-modal");
    e.preventDefault();
    selector.classList.toggle("hidden");
  });

  navitems.forEach((element) => {
    nav.appendChild(element);
  });

  return nav;
}
