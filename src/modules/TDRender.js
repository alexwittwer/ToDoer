import { Project, Todo } from "./todo";

// Helper functions

function killChildren(parent) {
  while (parent.firstElementChild) {
    parent.removeChild(parent.firstElementChild);
  }
  return;
}

function killTodoModal() {
  const modal = document.querySelector(".todo-modal");
  modal.remove();
}

function makeTodoButton(parent) {
  const todobtn = document.createElement("button");
  todobtn.textContent = "Create new ToDoer";
  todobtn.classList.add("todo-btn");
  todobtn.addEventListener("click", (e) => {
    toggleTodoModal();
  });
  parent.appendChild(todobtn);
}

function toggleTodoModal() {
  const todoModal = document.querySelector(".todo-modal");
  todoModal.classList.toggle("hidden");
}

// adds new Todo to current project, closes the modal
function updateProject(newTodo, currentProject) {
  toggleTodoModal();
  currentProject.add(newTodo);
}

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
      dueInput.value
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
