import { Project, addTodo } from "./todo";
import { TodoModal } from "./modal";

export default function Content(projectArg) {
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
