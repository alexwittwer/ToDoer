import "./input.css";
import makeTitle from "./modules/title";
import makeHeader from "./modules/header";
import makeNav from "./modules/nav";

const container = document.querySelector(".container");

// initial population
container.appendChild(makeTitle());
container.appendChild(makeHeader());
container.appendChild(makeNav());
