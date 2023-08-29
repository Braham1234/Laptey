//highlight password input on focus
export const highlightPasswordInput = (form) => {
  const passwordInput = form.querySelector("input[name='password']");
  const passwordContainer = form.querySelector(".password");

  passwordInput.addEventListener("focus", () => {
    passwordContainer.style.borderColor = "#ffd29d";
  });

  passwordInput.addEventListener("focusout", () => {
    passwordContainer.style.borderColor = "#e8e8e8";
  });
};

//to show user feedbacks
export const setUpMessage = (message, type) => {
  const HTMLBody = document.querySelector("body");
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message");

  const messageTypeClass = `message__${type}`;
  messageContainer.classList.add(messageTypeClass);

  messageContainer.classList.add("message__appear");
  messageContainer.innerHTML = `
    <p class="message__text">${message}</p>
  `;
  HTMLBody.prepend(messageContainer);

  setTimeout(() => {
    messageContainer.classList.add("message__disappear");
  }, 4000);

  setTimeout(() => {
    messageContainer.remove();
  }, 4250);
};

//setting up modal
export const setUpModalHandler = (event) => {
  const mealId = event.currentTarget.id;
  const fullStarNum = event.currentTarget.dataset.forFullstars;
  const body = document.querySelector("body");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  // modal.classList.add("modal--slide-in");
  const backdrop = document.createElement("div");
  backdrop.classList.add("backdrop");

  body.prepend(backdrop);
  body.prepend(modal);

  async function loadProductById(mealId) {
    // const mealId = clickedMealCard.getAttribute("id");
    const res = await fetch(`/product-by-id/${mealId}`, {
      method: "GET",
    });
    const resData = await res.json();
    const meal = resData.product;

    modal.innerHTML = `
        <div class="container-left">
        <div class="wishlist">
          <ion-icon name="heart-outline"></ion-icon>
        </div>
        <img src=${meal.imgUrl} />
        </div>
        <div class="container-right">
        <div class="close-btn" id ="close-btn"><ion-icon name="close-outline"></ion-icon></div>
          <h1 class="meal-name">${meal.name}</h1>
          <p class="intro">${meal.intro}</p>
          <div class="horizontal-container">
            <div class="rate">
              <h3>Rate</h3>
              <span class="price">Rs. ${meal.price}</span>
            </div>
            <div class="qty">
              <h3>Quantity</h3>
              <div class="qty-control">
                <div class="btn dec__btn"><ion-icon name="remove-outline"></ion-icon></div>
                <input type="text" name="quantity" readonly min=1 value=1>
                <div class="btn inc__btn"><ion-icon name="add-outline"></ion-icon></div>
              </div>
            </div>
          </div>
          <div class="description-container">
            <h3>Description</h3>
            <p>
              ${meal.description}
            </p>
          </div>
          <div class="ratings"></div>
            <div class="horizontal-container">
              <div>
                <h3>Total price</h3>
                <span> Rs. <span id="total-price">${meal.price}</span></span>
              </div>
              <button type="submit" class="add-to-cart-btn"><ion-icon name="cart-outline"></ion-icon><span>Add to cart</span></button>
            </div>
          </div>
        </div>`;

    const mealRatings = modal.querySelector(".ratings");

    function addStars(starType, starNum) {
      for (let i = 1; i <= starNum; i++) {
        const fullStar = document.createElement("ion-icon");
        fullStar.name = starType;
        mealRatings.append(fullStar);
      }
    }

    addStars("star", fullStarNum);
    addStars("star-outline", 5 - fullStarNum);

    //input controllers
    const qtyController = modal.querySelector(".qty-control");
    const incQtyBtn = qtyController.querySelector(".inc__btn");
    const decQtyBtn = qtyController.querySelector(".dec__btn");
    const qtyInput = qtyController.querySelector("input");
    const totalPrice = modal.querySelector("#total-price");
    let qty = qtyInput.value;

    const calcTotalPrice = (qty) => {
      totalPrice.textContent = qty * meal.price;
    };

    const incBtnHandler = () => {
      if (qty < 10) {
        incQtyBtn.classList.remove("qty-control__btn--disable");
        decQtyBtn.classList.remove("qty-control__btn--disable");
        qtyInput.setAttribute("value", ++qty);

        calcTotalPrice(qty);

        if (qty === 10) {
          incQtyBtn.classList.add("qty-control__btn--disable");
        }
      }
    };

    const decBtnHandler = () => {
      if (qty > 1) {
        incQtyBtn.classList.remove("qty-control__btn--disable");
        decQtyBtn.classList.remove("qty-control__btn--disable");
        qtyInput.setAttribute("value", --qty);

        calcTotalPrice(qty);

        if (qty === 1) {
          decQtyBtn.classList.add("qty-control__btn--disable");
        }
      } else {
        decQtyBtn.classList.add("qty-control__btn--disable");
      }
    };

    incQtyBtn.addEventListener("click", incBtnHandler);
    decQtyBtn.addEventListener("click", decBtnHandler);
    decQtyBtn.click();

    // modal.classList.add("modal--slide-in");

    const removeModalHandler = () => {
      // modal.classList.remove("modal--slide-in");
      backdrop.remove();
      modal.remove();
    };

    const addToCartBtnHandler = () => {
      fetch("/user/cart/add-to-cart", {
        method: "POST",
        body: JSON.stringify({
          cartItem: {
            imgUrl: meal.imgUrl,
            mealId: mealId,
            product: meal.name,
            mealQty: Number(qty),
            mealRate: Number(meal.price),
            mealTotalPrice: Number(totalPrice.innerText),
            category: meal.category,
            ratings: meal.ratings,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          // console.log(resData);
          setUpMessage(resData.message, resData.type);
        });
    };

    const addToCartBtn = modal.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", addToCartBtnHandler);

    const closeBtn = modal.querySelector(".close-btn");
    closeBtn.addEventListener("click", removeModalHandler);
    backdrop.addEventListener("click", removeModalHandler);
  }

  loadProductById(mealId);
};

//search feature
export const setUpSearch = () => {
  const searchBar = document.querySelector(".search");
  const searchInput = searchBar.querySelector("input");
  const searchBtn = searchBar.querySelector(".search__button");

  searchInput.addEventListener("focus", () => {
    searchBar.style.borderColor = "#ffd29d";
  });

  searchInput.addEventListener("focusout", () => {
    searchBar.style.borderColor = "#c0c0c0";
  });

  const searchBtnHandler = (event) => {
    const searchInput = event.currentTarget.previousElementSibling;
    const searchBy = searchInput.value;

    window.location.href = `/search?q=${searchBy}`;
  };

  searchBtn.addEventListener("click", searchBtnHandler);
};
