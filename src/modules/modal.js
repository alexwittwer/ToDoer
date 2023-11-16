import { Project, Todo } from "./todo";

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
  form.classList.add("modal");

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
  priorityLabel.textContent = "Task Priority";
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
      priorityInput.value,
      dueInput.value
    );
    console.log(newTodo);
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
    form.classList.toggle("hidden");
    const newProject = new Project(titleInput.value);
    console.log(newProject);
  });

  titleLabel.setAttribute("for", "projectTitle");
  titleLabel.textContent = "ToDoer title";
  titleLabel.appendChild(titleInput);

  form.appendChild(titleLabel);
  form.appendChild(submitButton);

  return form;
}
