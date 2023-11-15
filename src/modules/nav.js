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

  thisWeek.textContent = "This week";
  nextWeek.textContent = "Next week";
  projects.textContent = "Projects";
  addProject.textContent = "Add project";

  // event listeners

  /*   thisWeek.addEventListener((e) => {
    // TODO show all items ending this week
  });

  nextWeek.addEventListener((e) => {
    // TODO show all items ending next week
  });

  projects.addEventListener((e) => {
    // TODO collapse or expand to show current projects
  }); */

  navitems.forEach((element) => {
    nav.appendChild(element);
  });

  return nav;
}
