export default function makeTitle() {
  const container = document.createElement("div");
  const title_1 = document.createElement("h1");
  const title_2 = document.createElement("h1");

  container.classList.add("section-container-title");
  title_1.classList.add("title", "title-one");
  title_2.classList.add("title", "title-two");

  title_1.textContent = "To";
  title_2.textContent = "Doer//";

  container.appendChild(title_1);
  container.appendChild(title_2);

  return container;
}
