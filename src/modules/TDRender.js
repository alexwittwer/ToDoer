import { Project, Todo } from "./todo";
import { addWeeks, isWithinInterval, format } from "date-fns";

// --- Helper functions --- //

// destroys all children elements of a parent element
export function killChildren(parent) {
  while (parent.firstElementChild) {
    parent.removeChild(parent.firstElementChild);
  }
  return;
}

// clears Todo modal
function killTodoModal() {
  const modal = document.querySelector(".todo-modal");
  modal.remove();
}

// Adds Todo creation button, useful for after clearing content
function makeTodoButton(parent) {
  const todobtn = document.createElement("button");
  todobtn.textContent = "Create new ToDoer";
  todobtn.classList.add("todo-btn");
  todobtn.addEventListener("click", (e) => {
    toggleTodoModal();
  });
  parent.appendChild(todobtn);
}

// toggles Todo Modal hidden/shown
function toggleTodoModal() {
  const todoModal = document.querySelector(".todo-modal");
  todoModal.classList.toggle("hidden");
}

// adds new Todo to current project, closes the modal
function updateProject(newTodo, currentProject) {
  toggleTodoModal();
  currentProject.add(newTodo);
}

// creates a new project element in the nav pane, adds event listener to populate content pane
function createProjectElement(project, parent) {
  const newProjectElem = document.createElement("div");
  newProjectElem.textContent = project.project;
  newProjectElem.addEventListener("click", (e) => {
    updateContent(project);
    killTodoModal();
    document.body.appendChild(TodoModal(project));
  });
  parent.appendChild(newProjectElem);
}

function toggleProjectModal(element) {
  element.classList.toggle("hidden");
}

// renders a new Todoer item, local function only
function renderTodo(currentTodo) {
  const todoElem = document.createElement("div");
  const titleElem = document.createElement("div");
  const descriptionElem = document.createElement("div");
  const priorityElem = document.createElement("div");
  const dueElem = document.createElement("div");
  const completedElem = document.createElement("input");
  const completedElemLabel = document.createElement("label");
  const id = crypto.randomUUID();

  completedElem.type = "checkbox";
  completedElem.id = id;
  completedElemLabel.setAttribute("for", id);
  completedElemLabel.textContent = "Mark Complete: ";
  completedElemLabel.appendChild(completedElem);

  todoElem.classList.add("todo-item");

  titleElem.textContent = currentTodo.title;
  descriptionElem.textContent = currentTodo.description;
  priorityElem.textContent = currentTodo.priority;
  dueElem.textContent = currentTodo.due;
  completedElem.checked = currentTodo.completed;

  const todo_elements = [
    titleElem,
    descriptionElem,
    priorityElem,
    dueElem,
    completedElemLabel,
  ];
  todo_elements.forEach((e) => {
    e.classList.add("todo-param");
    todoElem.appendChild(e);
  });

  return todoElem;
}

// updates the content section
function updateContent(project) {
  const container = document.querySelector(".content-section"); // content section container
  killChildren(container);
  makeTodoButton(container);

  // appends all the todos from the project, if any.
  if (project.todos === undefined) {
    return;
  } else {
    project.todos.forEach((item) => {
      container.appendChild(renderTodo(item));
    });
  }

  return;
}

// --- Export Functions --- //
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
      const thisWeekTodoElement = renderTodo(todo);
      contentWindow.appendChild(thisWeekTodoElement);
    });
  });
  nextWeek.addEventListener("click", () => {
    const contentWindow = document.querySelector(".content-section");
    killChildren(contentWindow);
    const nextWeekTodos = dueNextWeek(projectsArr);
    nextWeekTodos.forEach((todo) => {
      const nextWeekTodoElement = renderTodo(todo);
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

  return nav;
}
// Renders the Todo Modal pane (accessible from projects only)
export function TodoModal(currentProject) {
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
      new Date(dueInput.value)
    );
    // update content
    updateProject(newTodo, currentProject);
    updateContent(currentProject);
  });

  form.appendChild(titleLabel);
  form.appendChild(descriptionLabel);
  form.appendChild(priorityLabel);
  form.appendChild(dueLabel);
  form.appendChild(submitButton);

  return form;
}

// creates the Project modal for creating new projects
export function ProjectModal(projectsArr) {
  const form = document.createElement("form");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const submitButton = document.createElement("button");

  form.setAttribute("action", "");
  form.classList.add("project-modal", "hidden");

  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "Project title");
  titleInput.setAttribute("id", "projectTitle");

  titleLabel.setAttribute("for", "projectTitle");
  titleLabel.textContent = "ToDoer title";
  titleLabel.appendChild(titleInput);

  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Add Project";
  submitButton.addEventListener("click", (e) => {
    const projects = document.querySelector(".projects-nav"); // necessary tight link

    e.preventDefault();
    toggleProjectModal(form);
    killChildren(projects);

    // creates new project
    const newProject = new Project(titleInput.value);
    projectsArr.push(newProject);
    projectsArr.forEach((item) => {
      createProjectElement(item, projects);
    });
  });

  form.appendChild(titleLabel);
  form.appendChild(submitButton);

  return form;
}

export function dueThisWeek(projectArr) {
  const today = new Date();
  const nextweek = addWeeks(new Date(), 1);

  const dueTodos = [];

  projectArr.forEach((project) => {
    project.todos.forEach((todo) => {
      if (
        isWithinInterval(todo.due, {
          start: today,
          end: nextweek,
        })
      ) {
        dueTodos.push(todo);
      }
    });
  });

  console.log(dueTodos);

  return dueTodos;
}

export function dueNextWeek(projectArr) {
  const today = new Date();
  const nextweek = addWeeks(today, 1);
  const secondWeek = addWeeks(today, 2);

  const dueTodos = [];

  projectArr.forEach((project) => {
    project.todos.forEach((todo) => {
      if (
        isWithinInterval(new Date(todo.due), {
          start: nextweek,
          end: secondWeek,
        })
      ) {
        dueTodos.push(todo);
      }
    });
  });

  return dueTodos;
}

function updateWeekTodos(projectArr) {
  const thisWeek = document.querySelector(".this-week");
  const nextWeek = document.querySelector(".next-week");
  const container = document.querySelector(".content-section");

  thisWeek.addEventListener("click", (e) => {});

  nextWeek.addEventListener("click", (e) => {
    killChildren(container);
    updateContent(dueNextWeek(projectArr));
  });
}
