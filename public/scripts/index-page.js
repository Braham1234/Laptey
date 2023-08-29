import { setUpModalHandler, setUpSearch } from "./utility.js";

const categorySection = document.querySelector("#categories");
const mealViewer = categorySection.querySelector("#meal-viewer");
const categoryBtns = categorySection.querySelectorAll(
  ".categories__list #category-btn"
);

//load meal cards
const loadMealCards = (meals, mealsContainer) => {
  meals.forEach((mealItem) => {
    let mealListItem = document.createElement("li");
    mealListItem.classList.add("meal");
    mealListItem.id = mealItem._id;
    mealListItem.innerHTML = `
              <div class="wishlist">
                <ion-icon name="heart-outline"></ion-icon>
              </div>
              <div class="img-container">
                <img src="${mealItem.imgUrl}" />
              </div>
              <div class="details">
                <h3>${mealItem.name}</h3>
                <span>Rs. ${mealItem.price}</span>
                <div class="ratings">
                </div>
              </div>`;
    mealListItem.addEventListener("click", setUpModalHandler);

    const mealRatings = mealListItem.querySelector(".ratings");

    function addStars(starType, starNum) {
      for (let i = 1; i <= starNum; i++) {
        const fullStar = document.createElement("ion-icon");
        fullStar.name = starType;
        mealRatings.append(fullStar);
      }
    }

    const fullStarNum = mealItem.ratings;
    mealListItem.setAttribute("data-for-fullstars", fullStarNum);
    addStars("star", fullStarNum);
    addStars("star-outline", 5 - fullStarNum);

    mealsContainer.appendChild(mealListItem);
  });
};

//setting up loading meals by category
const setupCategoryBtns = () => {
  async function loadProducts(category, clickedCategoryBtn) {
    mealViewer.querySelectorAll("li").forEach((li) => li.remove());

    categoryBtns.forEach((btn) => {
      btn.classList.remove("category-btn-active");
    });

    clickedCategoryBtn.classList.add("category-btn-active");

    const res = await fetch(`/products/${category}`, { method: "GET" });
    const resData = await res.json();
    const meals = resData.products;

    loadMealCards(meals, mealViewer);

    // mealCards = mealViewer;
  }

  //loading meals according to selected category
  function categoryBtnHandler(event) {
    const categoryBtn = event.target.closest("li#category-btn");

    const categoryName = categoryBtn.dataset.forBtn.toLowerCase();
    loadProducts(categoryName, categoryBtn);
  }

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", categoryBtnHandler);
  });
};

//scroll category
const setUpCategoryScroll = () => {
  const categoryContainer = document.querySelector(".categories__list");
  const leftArrow = document.getElementById("scroll-left-arrow");
  const rightArrow = document.getElementById("scroll-right-arrow");

  let level = 0;

  // console.log(categoryContainer.scrollLeft);

  leftArrow.addEventListener("click", () => {
    if (level > 0) {
      categoryContainer.scrollLeft -= 140;
      level--;
      // console.log(level);
    }
  });

  rightArrow.addEventListener("click", () => {
    if (categoryContainer.scrollLeft == 0) {
      level = 0;
    }
    if (level < 2) {
      categoryContainer.scrollLeft += 140;
      level++;
      // console.log(level);
    }
  });
};

//recommendations
const setUpRecommendations = async () => {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  const token = cookie["token"];

  if (token) {
    const res = await fetch(`/recommendations`, { method: "GET" });
    const resData = await res.json();
    const products = resData.products;

    if (products.length > 0) {
      const recommendationsSection = document.createElement("section");
      recommendationsSection.classList.add("recommendations");
      recommendationsSection.innerHTML = `
      <section class="recommendations">
        <h1>Recommended for you</h1>
        <ul class="meals">
        </ul>
      </section>
    `;

      const mealsContainer = recommendationsSection.querySelector(".meals");
      loadMealCards(products, mealsContainer);
      const categorySection = document.querySelector(".categories#categories");
      // console.log(categorySection);

      categorySection.parentNode.insertBefore(
        recommendationsSection,
        categorySection
      );
    }
  }
};

const setUpModalRecommendations = () => {
  if (document.querySelector(".recommendations")) {
    const recommendedProducts = document.querySelectorAll(
      ".recommendations .meals .meal"
    );
    recommendedProducts.forEach((product) => {
      product.addEventListener("click", setUpModalHandler);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupCategoryBtns();
  categoryBtns[0].click();

  setUpSearch();
  setUpRecommendations();
  setUpCategoryScroll();
});
