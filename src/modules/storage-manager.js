export function saveProjects(projectsArr) {
  projectsArr.forEach((project) => {
    localStorage.setItem(project.project, JSON.stringify(project));
  });
}

export function returnProjects() {
  const returnedArray = [];
  const localStorageKeys = Object.keys(localStorage);

  localStorageKeys.forEach((key) => {
    const project = localStorage.getItem(key);
    returnedArray.push(JSON.parse(project));
  });

  return returnedArray;
}
