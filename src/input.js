import "./input.css";
import makeTitle from "./modules/title";
import makeHeader from "./modules/header";

const container = document.querySelector(".container");

container.appendChild(makeTitle());

container.appendChild(makeHeader());
