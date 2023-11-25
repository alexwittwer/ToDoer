/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import Todo from "./todo";
import Project from "./project";

export function saveProject(currentProject) {
  localStorage.setItem(currentProject.project, JSON.stringify(currentProject));
}

export function returnProjects() {
  const tempArray = [];
  const localStorageKeys = Object.keys(localStorage);

  localStorageKeys.forEach((key) => {
    const projectData = localStorage.getItem(key);
    const projectObj = JSON.parse(projectData);

    const todos = projectObj.todos.map(
      (todo) =>
        new Todo(
          todo.title,
          todo.description,
          todo.priority,
          new Date(todo.due)
        )
    );

    const newProject = new Project(projectObj.project, ...todos);
    tempArray.push(newProject);
  });

  return tempArray;
}

export function updateLocalStorage(projectArr) {
  localStorage.clear();
  projectArr.forEach((project) => {
    localStorage.setItem(project.project, JSON.stringify(project));
  });
}
