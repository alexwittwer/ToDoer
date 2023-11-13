import Logo from "../assets/todo-title.svg";

export default function makeHeader() {
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
