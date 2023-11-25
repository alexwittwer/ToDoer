/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { format } from "date-fns";
import {
  updateProject,
  updateContent,
  killChildren,
  killEditModal,
  toggleEditModal,
  toggleProjectModal,
  toggleTodoModal,
  createProjectElement,
} from "./TDRender";
import Project from "./project";
import Todo from "./todo";
import { saveProject } from "./storage-manager";

// --- Render Functions --- //

// renders a new Todoer item, local function only
export function renderTodo(currentTodo, currentProject) {
  const todoElem = document.createElement("div");
  const titleElem = document.createElement("div");
  const descriptionElem = document.createElement("div");
  const priorityElem = document.createElement("div");
  const dueElem = document.createElement("div");
  const completedElem = document.createElement("input");
  const completedElemLabel = document.createElement("label");
  const id = crypto.randomUUID();
  const edit = document.createElement("button");
  const deleteTodo = document.createElement("button");
  const actions = document.createElement("div");

  completedElem.type = "checkbox";
  completedElem.id = id;
  completedElemLabel.setAttribute("for", id);
  completedElemLabel.textContent = "Mark Complete: ";
  completedElemLabel.appendChild(completedElem);

  todoElem.classList.add("todo-item");
  if (currentTodo.completed) {
    todoElem.classList.add("completed");
  }

  titleElem.textContent = currentTodo.title;
  descriptionElem.textContent = currentTodo.description;
  priorityElem.textContent = `Priority: ${currentTodo.priority}`;
  dueElem.textContent = `Due: ${format(currentTodo.due, "MM/dd/yyyy")}`;
  completedElem.checked = currentTodo.completed;
  completedElem.addEventListener("click", (e) => {
    e.preventDefault();
    todoElem.classList.toggle("completed");
    currentTodo.markCompleted();
  });

  edit.textContent = "Edit";
  edit.classList.add("edit-btn");
  edit.addEventListener("click", (e) => {
    e.preventDefault();
    killEditModal();
    document.body.appendChild(editModal(currentProject, currentTodo));
    toggleEditModal();
  });

  deleteTodo.textContent = "Delete";
  deleteTodo.classList.add("edit-btn", "delete-btn");
  deleteTodo.addEventListener("click", (e) => {
    e.preventDefault();
    currentProject.delete(currentTodo);
    updateContent(currentProject);
  });

  actions.classList.add("action-btns");

  if (currentProject != null) {
    actions.appendChild(edit);
    actions.appendChild(deleteTodo);
  }

  const todoElements = [
    titleElem,
    descriptionElem,
    priorityElem,
    dueElem,
    completedElemLabel,
    actions,
  ];
  todoElements.forEach((element) => {
    element.classList.add("todo-param");
    todoElem.appendChild(element);
  });

  return todoElem;
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
  submitButton.type = "button";

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
    saveProject(currentProject);
    toggleTodoModal();
  });

  const close = document.createElement("button");
  close.classList.add("close-btn");
  close.textContent = "X";
  close.addEventListener("click", (e) => {
    e.preventDefault();
    toggleTodoModal();
  });

  form.appendChild(close);
  form.appendChild(titleLabel);
  form.appendChild(descriptionLabel);
  form.appendChild(priorityLabel);
  form.appendChild(dueLabel);
  form.appendChild(submitButton);

  return form;
}

export function editModal(currentProject, currentTodo) {
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
  submitButton.type = "button";

  form.setAttribute("action", "");
  form.classList.add("modal", "edit-modal", "hidden");

  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "Todoer title");
  titleInput.setAttribute("id", "title-edit");

  priorityInput.setAttribute("type", "checkbox");
  priorityInput.setAttribute("name", "priority");
  priorityInput.setAttribute("id", "taskpriority-edit");

  dueInput.setAttribute("type", "date");
  dueInput.setAttribute("name", "Due date");
  dueInput.setAttribute("id", "due-edit");

  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("name", "task description");
  descriptionInput.setAttribute("id", "taskdesc-edit");

  descriptionLabel.textContent = "Description";
  titleLabel.textContent = "ToDoer title";
  priorityLabel.textContent = "Check for high priority";
  dueLabel.textContent = "Date due";
  submitButton.textContent = "Submit changes";

  titleLabel.appendChild(titleInput);
  descriptionLabel.appendChild(descriptionInput);
  priorityLabel.appendChild(priorityInput);
  dueLabel.appendChild(dueInput);

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    // Check if currentTodo is not null before calling edit()
    if (currentTodo) {
      currentTodo.edit(
        titleInput.value,
        descriptionInput.value,
        new Date(dueInput.value),
        priorityInput.value
      );
      // update content
      updateContent(currentProject);
      toggleEditModal();
    }
  });

  const close = document.createElement("button");
  close.classList.add("close-btn");
  close.textContent = "X";
  close.addEventListener("click", (e) => {
    e.preventDefault();
    toggleEditModal();
  });

  form.appendChild(close);
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
  form.classList.add("modal", "project-modal", "hidden");

  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("name", "Project title");
  titleInput.setAttribute("id", "projectTitle");
  titleInput.required = true;

  titleLabel.setAttribute("for", "projectTitle");
  titleLabel.textContent = "ToDoer title";
  titleLabel.appendChild(titleInput);

  submitButton.setAttribute("type", "button");
  submitButton.textContent = "Add Project";
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const projects = document.querySelector(".projects-nav"); // necessary tight link
    toggleProjectModal(form);
    killChildren(projects);

    // creates new project
    const newProject = new Project(titleInput.value);
    projectsArr.push(newProject);
    projectsArr.forEach((item) => {
      createProjectElement(item, projects);
    });
  });

  const close = document.createElement("button");
  close.classList.add("close-btn");
  close.textContent = "X";
  close.addEventListener("click", (e) => {
    e.preventDefault();
    toggleProjectModal(form);
  });

  form.appendChild(close);
  form.appendChild(titleLabel);
  form.appendChild(submitButton);

  return form;
}