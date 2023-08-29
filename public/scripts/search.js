import { setUpModalHandler, setUpSearch } from "./utility.js";

const searchInput = document.querySelector(".search__input");
const queries = window.location.search;
const urlParams = new URLSearchParams(queries);

searchInput.value = urlParams.get("q");

const meals = document.querySelectorAll(".meal");
meals.forEach((meal) => {
  meal.addEventListener("click", setUpModalHandler);
});

setUpSearch();
