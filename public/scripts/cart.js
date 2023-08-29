import { setUpMessage } from "./utility.js";

const cartItems = document.querySelectorAll(".cart-item");

function checkForEmptyCart() {
  if (document.querySelector(".empty-cart-message")) {
    return;
  }

  const hasCartItem = document.querySelector(".cart-item");
  if (!hasCartItem) {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.classList.add("empty-cart-message");
    emptyCartMessage.innerHTML = `Your cart is empty. Please click
    <a href="/#categories">here</a>
    to add your favourite meals.`;

    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.prepend(emptyCartMessage);
  }
}

const delBtnHandler = (event) => {
  const btn = event.target;
  const cartItem = btn.parentElement.parentElement;
  const cartId = cartItem.id;
  fetch("/my-cart/removeItem", {
    method: "POST",
    body: JSON.stringify({
      cartItem: {
        mealId: cartId,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        cartItem.remove();
      }
      checkForEmptyCart();
      return res.json();
    })
    .then((resData) => {
      setUpMessage(resData.message, resData.type);
    });
};

//item selection
const selectItemHandler = (event) => {
  const itemContainer = event.currentTarget;
  itemContainer.classList.toggle("cart-item--active");
};

cartItems.forEach((item) => {
  item.addEventListener("click", selectItemHandler);
  const delBtn = item.querySelector(".cart-item__btns [name='trash']");
  delBtn.addEventListener("click", delBtnHandler);
});

//for checkout feature
const checkoutCard = document.querySelector(".checkout");
const checkoutBtn = checkoutCard.querySelector(".checkout__btn");

const checkoutBtnHandler = () => {
  const selectedMeals = document.querySelectorAll(".cart-item--active");
  let meals = [];
  selectedMeals.forEach((meal) => {
    const mealDetails = meal.querySelectorAll("span.value");
    const mealId = meal.id;
    const product = mealDetails[0].innerText;
    const mealRate = mealDetails[1].innerText.split(". ")[1];
    const mealQty = mealDetails[2].innerText;
    const mealTotalPrice = mealDetails[3].innerText.split(". ")[1];

    const mealObject = {
      mealId,
      product,
      mealRate: Number(mealRate),
      mealQty: Number(mealQty),
      mealTotalPrice: Number(mealTotalPrice),
    };

    meals.push(mealObject);
  });

  console.log(meals);
  const deliveryAddress = checkoutCard.querySelector("[name='address']").value;
  const deliveryDate = checkoutCard.querySelector("[name='date']").value;
  const deliveryTime = checkoutCard.querySelector("[name='time']").value;

  // console.log(deliveryAddress, deliveryDate, deliveryTime, mealIds);

  fetch("/checkout", {
    method: "POST",
    body: JSON.stringify({
      deliveryAddress: deliveryAddress,
      deliveryDate: deliveryDate,
      deliveryTime: deliveryTime,
      meals: meals,
    }),

    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        selectedMeals.forEach((meal) => {
          meal.remove();
        });
      }
      checkForEmptyCart();
      return res.json();
    })
    .then((resData) => {
      setUpMessage(resData.message, resData.type);
    });
};

checkoutBtn.addEventListener("click", checkoutBtnHandler);

//checkout for small screen
const floatingBtn = document.querySelector(".floating-btn");
const closeCheckoutCardBtn = checkoutCard.querySelector(".close-btn");
const _checkoutCard = document.querySelector("#checkout-card");
const container = document.querySelector(".container");
const backdrop = document.createElement("div");

floatingBtn.addEventListener("click", () => {
  backdrop.classList.add("backdrop");
  container.append(backdrop);
  _checkoutCard.style.display = "flex";
  _checkoutCard.style.zIndex = "9999";
});

const removeCheckoutBackdrop = () => {
  _checkoutCard.style.display = "none";
  backdrop.remove();
};

closeCheckoutCardBtn.addEventListener("click", removeCheckoutBackdrop);
backdrop.addEventListener("click", removeCheckoutBackdrop);
