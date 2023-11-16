import { Project, Todo, addTodo } from "./todo";
import Logo from "../assets/todo-title.svg";

export function Content(projectArg) {
  if (!document.querySelector(".content-section")) {
    const content = document.createElement("section");
    content.classList.add("content-section");

    return content;
  }
}

export function updateContent(project) {
  const container = document.querySelector(".content-section"); // content section container
  // kills all children
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  const todobtn = document.createElement("button");
  todobtn.textContent = "Create new Todoer";
  todobtn.classList.add("todo-btn");
  todobtn.addEventListener("click", (e) => {
    const todoModal = document.querySelector(".todo-modal");
    todoModal.classList.toggle("hidden");
  });
  container.appendChild(todobtn);
  // appends all the todos from the project, if any.
  if (project.todos === undefined) {
    // creates the button for adding todos from modal
  }
}

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

export function TodoModal() {
  const form = document.createElement("form");

  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const descriptionLabel = document.createElement("label");
  const descriptionInput = document.createElement("input");
  const priorityLabel = document.createElement("label");
  const priorityInput = document.createElement("input");
  const dueLabel = document.createElement("label");
  const dueInput = document.createElement("input");
  const submitButton = document.createElement("button");

  form.setAttribute("action", "");
  form.classList.add("modal", "todo-modal", "hidden");

  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "Todoer title");
  titleInput.setAttribute("id", "title");

  priorityInput.setAttribute("type", "checkbox");
  priorityInput.setAttribute("name", "priority");
  priorityInput.setAttribute("id", "taskpriority");

  dueInput.setAttribute("type", "date");
  dueInput.setAttribute("name", "Due date");
  dueInput.setAttribute("id", "due");

  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("name", "task description");
  descriptionInput.setAttribute("id", "taskdesc");

  descriptionLabel.textContent = "Description";
  titleLabel.textContent = "ToDoer title";
  priorityLabel.textContent = "Check for high priority";
  dueLabel.textContent = "Date due";
  submitButton.textContent = "Add new ToDoer";

  titleLabel.appendChild(titleInput);
  descriptionLabel.appendChild(descriptionInput);
  priorityLabel.appendChild(priorityInput);
  dueLabel.appendChild(dueInput);

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newTodo = new Todo(
      titleInput.value,
      descriptionInput.value,
      priorityInput.checked,
      dueInput.value
    );
    // add todo to current project
    const container = document.querySelector(".content-section");
    const modal = document.querySelector(".todo-modal");
    container.appendChild(addTodo(newTodo));
    modal.classList.toggle("hidden");
  });

  form.appendChild(titleLabel);
  form.appendChild(descriptionLabel);
  form.appendChild(priorityLabel);
  form.appendChild(dueLabel);
  form.appendChild(submitButton);

  return form;
}

export function ProjectModal() {
  const form = document.createElement("form");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const submitButton = document.createElement("button");

  form.setAttribute("action", "");
  form.classList.add("project-modal", "hidden");

  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "Project title");
  titleInput.setAttribute("id", "projectTitle");

  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Add Project";
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    // toggle hidden
    form.classList.toggle("hidden");

    // creates new project
    const newProject = new Project(titleInput.value);

    // creates link to project in nav
    const projects = document.querySelector(".projects-nav");
    const newProjectElem = document.createElement("div");
    newProjectElem.addEventListener("click", (e) => {
      updateContent(newProject);
    });
    newProjectElem.textContent = newProject.project;
    projects.appendChild(newProjectElem);
  });

  titleLabel.setAttribute("for", "projectTitle");
  titleLabel.textContent = "ToDoer title";
  titleLabel.appendChild(titleInput);

  form.appendChild(titleLabel);
  form.appendChild(submitButton);

  return form;
}

export function Nav() {
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
