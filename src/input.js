import "./input.css";
import Title from "./modules/title";
import Header from "./modules/header";
import Nav from "./modules/nav";
import Content from "./modules/content";
import Todo, { addTodo } from "./modules/todo";

const container = document.querySelector(".container");

// initial population
container.appendChild(Title());
container.appendChild(Header());
container.appendChild(Nav());

const todoContainer = Content();

const todo_1 = new Todo();
const todo_2 = new Todo();
const todo_3 = new Todo("Hello", "World");
todo_1.updateTodoStrings("Bobs", "Burgers");
todo_2.changePriority();
todo_3.markCompleted();

todoContainer.appendChild(addTodo(todo_1));
todoContainer.appendChild(addTodo(todo_2));
todoContainer.appendChild(addTodo(todo_3));

container.appendChild(todoContainer);
