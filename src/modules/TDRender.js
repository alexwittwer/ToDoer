/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import { addWeeks, isWithinInterval } from "date-fns";
import { renderTodo, TodoModal } from "./ModalRenders.js";

// --- Helper functions --- //

// destroys all children elements of a parent element
export function killChildren(parent) {
  while (parent.firstElementChild) {
    parent.removeChild(parent.firstElementChild);
  }
}

// clears Todo modal
export function killTodoModal() {
  const modal = document.querySelector(".todo-modal");
  modal.remove();
}

export function killEditModal() {
  const modal = document.querySelector(".edit-modal");
  modal.remove();
}

export function toggleEditModal() {
  const editModalElement = document.querySelector(".edit-modal");
  editModalElement.classList.toggle("hidden");
}

// toggles Todo Modal hidden/shown
export function toggleTodoModal() {
  const todoModal = document.querySelector(".todo-modal");
  todoModal.classList.toggle("hidden");
}

// Adds Todo creation button, useful for after clearing content
export function makeTodoButton(parent) {
  const todobtn = document.createElement("button");
  todobtn.textContent = "Create new ToDoer";
  todobtn.classList.add("todo-btn");
  todobtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleTodoModal();
  });
  parent.appendChild(todobtn);
}

// adds new Todo to current project, closes the modal
export function updateProject(newTodo, currentProject) {
  currentProject.add(newTodo);
}

// TODO: the killChildren button is killing the modals
// updates the content section
export function updateContent(project) {
  const container = document.querySelector(".content-section"); // content section container
  killChildren(container);
  makeTodoButton(container);

  // appends all the todos from the project, if any.
  if (project.todos !== undefined) {
    project.todos.forEach((item) => {
      container.appendChild(renderTodo(item, project));
    });
  }
}

// creates a new project element in the nav pane, adds event listener to populate content pane
export function createProjectElement(project, parent) {
  const newProjectElem = document.createElement("div");
  newProjectElem.textContent = project.project;
  newProjectElem.addEventListener("click", (e) => {
    e.preventDefault();
    updateContent(project);
    killTodoModal();
    document.body.appendChild(TodoModal(project));
  });
  parent.appendChild(newProjectElem);
}

// toggles Project modal hidden/shown
export function toggleProjectModal(element) {
  element.classList.toggle("hidden");
}

// checks due date for todos ending this week
export function dueThisWeek(projectArr) {
  const today = new Date();
  today.setDate(today.getDate() - 1);
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

  return dueTodos;
}

// checks due date for todos ending next week
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
