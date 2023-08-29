import { setUpMessage } from "../utility.js";

//to display no items message
const viewNoItemsMessage = (container, messageText) => {
  let message = document.createElement("p");
  message.innerText = messageText;
  message.style.cssText = `
    font-family: "Poppins", sans-serif;
          font-weight: 400;
          font-size: 1rem;
          color: lighten($dark-color, 25);

          a {
            color: $primary-color;
          }`;

  container.prepend(message);
};

//checks if the container is empty
const checkForEmptyContainer = (container, message) => {
  const listItem = container.querySelector(".list-item");
  if (listItem === null) {
    viewNoItemsMessage(container, message);
  }
};

//side btn controllers
const setupTabs = (btnName, contentContainer) => {
  const tabBtns = document.querySelectorAll(`.${btnName}`);

  tabBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const tabTitle = button.dataset.forTab;

      const contentsToDeactivate = document.querySelectorAll(
        `.${contentContainer}`
      );

      contentsToDeactivate.forEach((content) =>
        content.classList.remove(`${contentContainer}--active`)
      );

      const contentToActivate = document.querySelector(
        `.${contentContainer}[data-tab="${tabTitle}"]`
      );

      contentToActivate.classList.add(`${contentContainer}--active`);

      tabBtns.forEach((btn) => btn.classList.remove(`${btnName}--active`));

      button.classList.add(`${btnName}--active`);
    });
  });
};

//add product
const addProductForm = document.querySelector(".add-product-form");
const addProductBtn = addProductForm.querySelector("button");

const addProductBtnHandler = () => {
  const mealName = addProductForm.querySelector("[name='meal-name']").value;
  const mealIntro = addProductForm.querySelector("[name='meal-intro']").value;
  const mealDesc = addProductForm.querySelector("[name='meal-desc']").value;
  const mealPhoto = addProductForm.querySelector("[name='meal-photo']")
    .files[0];
  const mealCategory = addProductForm
    .querySelector("[name='meal-category']")
    .value.toLowerCase();
  const mealRate = addProductForm.querySelector("[name='meal-rate']").value;

  const formData = new FormData();
  formData.append("name", mealName);
  formData.append("intro", mealIntro);
  formData.append("price", mealRate);
  formData.append("description", mealDesc);
  formData.append("category", mealCategory);
  formData.append("img", mealPhoto);

  fetch("./product/add", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.message) {
        setUpMessage(resData.message, resData.type);
      } else if (resData.error) {
        setUpMessage(resData.error, "error");
      }
    });
};

addProductBtn.addEventListener("click", addProductBtnHandler);

//signout
const signoutBtn = document.getElementById("signout-btn");

const signoutBtnHandler = () => {
  fetch("/admin/signout", {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/";
      }
      return res.json();
    })
    .then((resData) => {
      if (resData.message) {
        setUpMessage(resData.message, resData.type);
      } else if (resData.error) {
        setUpMessage(resData.error, "error");
      }
    });
};

signoutBtn.addEventListener("click", signoutBtnHandler);

//to clear list items
const clearListItems = (listItemsContainer) => {
  const listItems = listItemsContainer.querySelectorAll(".list-item");
  listItems.forEach((listItem) => listItem.remove());
};

//edit meals
const editContainer = document.querySelector(
  ".product__content[data-tab='edit']"
);

const editHandler = async () => {
  if (editContainer.querySelector("p")) {
    return;
  }

  clearListItems(editContainer);
  const res = await fetch("./products/get");
  const resData = await res.json();
  const products = resData.products;
  const isProductsEmpty = products.length === 0 ? true : false;

  if (isProductsEmpty) {
    viewNoItemsMessage(editContainer, "Available meals appear here.");
  } else {
    products.forEach((product) => {
      let productItem = document.createElement("li");
      productItem.classList.add("list-item");
      productItem.id = product._id;
      productItem.innerHTML = `
        <div class="list-item__details">
          <div class="cart-item__column">
                    <img class="img" src="${product.imgUrl}" />
          </div>    
          <div class="list-item__column">
            <span class="heading">Meal ID</span>
            <span class="value">${product._id}</span>
          </div>
          <div class="list-item__column">
            <span class="heading">Meal name</span>
            <span class="value" name="name">${product.name}</span>
          </div>
          <div class="list-item__column">
            <span class="heading">Rate</span>
            <span class="value" name="rate">Rs. ${product.price}</span>
          </div>
        </div>
        <div class="list-item__btns">
          <ion-icon name="pencil-outline"></ion-icon>
          <ion-icon name="trash-outline"></ion-icon>
        </div>
      </li>
    `;

      const modalHandler = () => {
        const body = document.querySelector("body");
        const modal = document.createElement("div");
        modal.classList.add("modal");
        // modal.classList.add("modal--slide-in");
        const backdrop = document.createElement("div");
        backdrop.classList.add("backdrop");

        body.prepend(backdrop);
        body.prepend(modal);
        modal.innerHTML = `
      <div class="close-btn" id ="close-btn"><ion-icon name="close-outline"></ion-icon></div>
      `;

        const removeModalHandler = () => {
          // modal.classList.remove("modal--slide-in");
          backdrop.remove();
          modal.remove();
        };

        const closeBtn = modal.querySelector(".close-btn");
        closeBtn.addEventListener("click", removeModalHandler);
        backdrop.addEventListener("click", removeModalHandler);
      };

      const editHandler = () => {
        let modal = document.querySelector(".modal");
        let mealItem = document.createElement("div");
        mealItem.innerHTML = `
                    <div class="view-panel__content" data-tab="product">
                      <div data-tab="edit" class="product__content">
                        <div class="edit-product-form">
                          <div class="input-row">
                            <label for="meal-name">Meal name</label>
                            <input type="text" id="meal-name" name="meal-name" value="${product.name}">
                          </div>
                          <div class="input-row">
                            <label for="meal-intro">Introduction</label>
                            <input type="text" id="meal-intro" name="meal-intro" value="${product.intro}">
                          </div>
                          <div class="input-row">
                            <label for="meal-desc">Description</label>
                            <textarea id="meal-desc" name="meal-desc" >${product.description}</textarea>
                          </div>
                          <div class="input-row">
                            <label for="meal-photo">Photo</label>
                            <input type="file" id="meal-photo" name="meal-photo" value="${product.imgUrl}">
                          </div>
                          <div class="input-row">
                          <label for="meal-category">Category</label>
                          <select id="meal-category" name="meal-category">
                          <option value="hot-deals">Hot-deals</option>
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="snacks">Snacks</option>
                          <option value="beverages">Beverages</option>
                          </select>
                          </div>
                          <div class="input-row">
                            <label for="meal-rate">Rate</label>
                            <input type="number" id="meal-rate" name="meal-rate" min="0" value="${product.price}">
                          </div>
                          <button>Update product</button>
                        </div>
                      </div>
                    </div>
                    </div>
              `;

        //making category dropdown dynamic
        const categorySelect = mealItem.querySelector("[name='meal-category']");
        categorySelect.setAttribute("value", product.category);
        const categoryOptionIndex = categorySelect.querySelector(
          `option[value='${product.category}']`
        ).index;
        categorySelect.selectedIndex = categoryOptionIndex;

        modal.appendChild(mealItem);
      };

      const btnContainers = productItem.querySelector(".list-item__btns");
      const editMealBtn = btnContainers.querySelector(
        "ion-icon[name='pencil-outline']"
      );
      const deleteMealBtn = btnContainers.querySelector(
        "ion-icon[name='trash-outline']"
      );

      editMealBtn.addEventListener("click", () => {
        modalHandler();
        editHandler();
        //edit product
        const editProductForm = document.querySelector(".edit-product-form");
        const editProductBtn = editProductForm.querySelector("button");

        const editProductHandler = () => {
          const mealId = product._id;
          const mealName =
            editProductForm.querySelector("[name='meal-name']").value;
          const mealIntro = editProductForm.querySelector(
            "[name='meal-intro']"
          ).value;
          const mealDesc =
            editProductForm.querySelector("[name='meal-desc']").value;
          const mealPhoto = editProductForm.querySelector("[name='meal-photo']")
            .files[0];
          const mealCategory = editProductForm
            .querySelector("[name='meal-category']")
            .value.toLowerCase();
          const mealRate =
            editProductForm.querySelector("[name='meal-rate']").value;

          const formData = new FormData();
          formData.append("id", mealId);
          formData.append("name", mealName);
          formData.append("intro", mealIntro);
          formData.append("price", mealRate);
          formData.append("description", mealDesc);
          formData.append("category", mealCategory);
          formData.append("img", mealPhoto);
          formData.append("prevImgUrl", product.imgUrl);

          fetch("./product/update", {
            method: "POST",
            body: formData,
          })
            .then((res) => {
              return res.json();
            })
            .then((resData) => {
              productItem
                .querySelector("img")
                .setAttribute("src", resData.updatedProduct.imgUrl);
              productItem.querySelector('span[name="name"]').innerText =
                mealName;
              productItem.querySelector('span[name="rate"]').innerText =
                mealRate;

              if (resData.message) {
                setUpMessage(resData.message, resData.type);
              } else if (resData.error) {
                setUpMessage(resData.error, "error");
              }
            });
        };

        editProductBtn.addEventListener("click", editProductHandler);
      });

      deleteMealBtn.addEventListener("click", () => {
        fetch(`./product/delete/${product._id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              productItem.remove();
              checkForEmptyContainer(
                editContainer,
                "Available meals appear here."
              );
            }
            return res.json();
          })
          .then((resData) => {
            if (resData.message) {
              setUpMessage(resData.message, resData.type);
            } else if (resData.error) {
              setUpMessage(resData.error, "error");
            }
          });
      });

      editContainer.appendChild(productItem);
    });
  }
};

//reservation controls
const reservationContainer = document.querySelector(
  '.view-panel__content[data-tab="reservation"]'
);

const reservationHandler = async () => {
  if (reservationContainer.querySelector("p")) {
    return;
  }

  clearListItems(reservationContainer);
  const res = await fetch("./reservation/getReservations");
  const resData = await res.json();
  const reservations = resData.reservations;
  const isReservationsEmpty = reservations.length === 0 ? true : false;

  if (isReservationsEmpty) {
    viewNoItemsMessage(
      reservationContainer,
      "Available reservations appear here."
    );
  } else {
    reservations.forEach((reservation) => {
      let reservationItem = document.createElement("li");
      reservationItem.classList.add("list-item");
      reservationItem.id = reservation._id;
      const reservationDate = new Date(reservation.date).toLocaleDateString();
      reservationItem.innerHTML = `
        <div class="list-item__details">
                      
        <div class="list-item__column">
          <span class="heading">User ID</span>
          <span class="value">${reservation.user}</span>
        </div>
          <div class="list-item__column">
            <span class="heading">Username</span>
            <span class="value">${reservation.userName}</span>
          </div>
          <div class="list-item__column">
            <span class="heading">Reservation date</span>
            <span class="value">${reservationDate}</span>
          </div>
          <div class="list-item__column">
            <span class="heading">Starting time</span>
            <span class="value">${reservation.startingTime}</span>
          </div>
          <div class="list-item__column">
            <span class="heading">Ending time</span>
            <span class="value">${reservation.endingTime}</span>
          </div>
          <div class="list-item__column">
            <span class="heading">Occasion</span>
            <span class="value">${reservation.occassion}</span>
          </div>
          <div class="list-item__column">
            <span class="heading">Party size</span>
            <span class="value">${reservation.partySize}</span>
          </div>
          <div class="list-item__column">
            <span class="heading">Table(s)</span>
            <span class="value">${reservation.tableRequired}</span>
          </div>
        </div>
        <div class="list-item__btns">
            <ion-icon name="checkmark-outline"></ion-icon>
        </div>
      </li>
    `;

      const btnContainers = reservationItem.querySelector(".list-item__btns");
      const checkBtn = btnContainers.querySelector(
        "ion-icon[name='checkmark-outline']"
      );

      checkBtn.addEventListener("click", () => {
        fetch(`./confirm/reservation/${reservation._id}`, {
          method: "POST",
          body: JSON.stringify({
            reservationDetails: {
              userName: reservation.userName,
              userEmail: reservation.userEmail,
              date: reservationDate,
              startingTime: reservation.startingTime,
              endingTime: reservation.endingTime,
              occasion: reservation.occassion,
              partySize: reservation.partySize,
              tableRequired: reservation.tableRequired,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) {
              reservationItem.remove();
              checkForEmptyContainer(
                reservationContainer,
                "Available reservations appear here."
              );
            }
            return res.json();
          })
          .then((resData) => {
            console.log(resData);
            if (resData.message) {
              setUpMessage(resData.message, resData.type);
            } else if (resData.error) {
              setUpMessage(resData.error, "error");
            }
          });
      });

      reservationContainer.appendChild(reservationItem);
    });
  }
};

//order controls
const orderContainer = document.querySelector(
  '.view-panel__content[data-tab="order"]'
);

const orderHandler = async () => {
  if (orderContainer.querySelector("p")) {
    return;
  }

  clearListItems(orderContainer);
  const res = await fetch("./checkout/getCheckouts");
  const resData = await res.json();
  const checkouts = resData.checkouts;
  const isCheckoutsEmpty = checkouts.length === 0 ? true : false;

  if (isCheckoutsEmpty) {
    viewNoItemsMessage(orderContainer, "Available orders appear here.");
  } else {
    checkouts.forEach((checkout) => {
      let checkoutItem = document.createElement("li");
      checkoutItem.classList.add("list-item");
      checkoutItem.id = checkout._id;
      const deliveryDate = new Date(checkout.deliveryDate).toLocaleDateString();
      checkoutItem.innerHTML = `
                <div class="list-item__details">
                  
                <div class="list-item__column">
                  <span class="heading">User ID</span>
                  <span class="value">${checkout.user}</span>
                </div>
                  <div class="list-item__column">
                    <span class="heading">Username</span>
                    <span class="value">${checkout.userName}</span>
                  </div>
                  <div class="list-item__column">
                    <span class="heading">Delivery date</span>
                    <span class="value">${deliveryDate}</span>
                  </div>
                  <div class="list-item__column">
                    <span class="heading">Delivery time</span>
                    <span class="value">${checkout.deliveryTime}</span>
                  </div>
                  <div class="list-item__column">
                    <span class="heading">Delivery Address</span>
                    <span class="value">${checkout.deliveryAddress}</span>
                  </div>
                </div>
                <div class="list-item__btns">
                    <ion-icon name="list-outline"></ion-icon>
                    <ion-icon name="checkmark-outline"></ion-icon>
                </div>
              </li>
        `;

      const modalHandler = () => {
        const body = document.querySelector("body");
        const modal = document.createElement("div");
        modal.classList.add("modal");
        // modal.classList.add("modal--slide-in");
        const backdrop = document.createElement("div");
        backdrop.classList.add("backdrop");

        body.prepend(backdrop);
        body.prepend(modal);
        modal.innerHTML = `
                <div class="close-btn" id ="close-btn"><ion-icon name="close-outline"></ion-icon></div>
                `;

        const removeModalHandler = () => {
          // modal.classList.remove("modal--slide-in");
          backdrop.remove();
          modal.remove();
        };

        const closeBtn = modal.querySelector(".close-btn");
        closeBtn.addEventListener("click", removeModalHandler);
        backdrop.addEventListener("click", removeModalHandler);
      };

      const viewHandler = () => {
        let meals = checkout.meals;
        meals.forEach((meal) => {
          let modal = document.querySelector(".modal");
          let mealItem = document.createElement("li");
          mealItem.classList.add("list-item");
          mealItem.id = meal.mealId;
          mealItem.innerHTML = `
                        <div class="list-item__details">
                        <div class="list-item__column">
                          <span class="heading">Meal</span>
                          <span class="value">${meal.product}</span>
                        </div>
                          <div class="list-item__column">
                            <span class="heading">Quantity</span>
                            <span class="value">${meal.mealQty}</span>
                          </div>
                          <div class="list-item__column">
                            <span class="heading">Rate</span>
                            <span class="value">Rs. ${meal.mealRate}</span>
                          </div>
                          <div class="list-item__column">
                            <span class="heading">Total price</span>
                            <span class="value">Rs. ${meal.mealTotalPrice}</span>
                          </div>
                        </div>
                      </li>
                `;
          modal.appendChild(mealItem);
        });
      };

      const btnContainers = checkoutItem.querySelector(".list-item__btns");
      const viewMealBtn = btnContainers.querySelector(
        "ion-icon[name='list-outline']"
      );
      const checkBtn = btnContainers.querySelector(
        "ion-icon[name='checkmark-outline']"
      );

      const checkBtnHandler = () => {
        fetch(`./confirm/checkout/${checkout._id}`, {
          method: "POST",
          body: JSON.stringify({
            checkoutDetails: {
              userName: checkout.userName,
              userEmail: checkout.userEmail,
              deliveryDate: deliveryDate,
              deliveryTime: checkout.deliveryTime,
              deliveryAddress: checkout.deliveryAddress,
              meals: checkout.meals,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) {
              checkoutItem.remove();
              checkForEmptyContainer(
                orderContainer,
                "Available orders appear here."
              );
            }
            return res.json();
          })
          .then((resData) => {
            console.log(resData);
            if (resData.message) {
              setUpMessage(resData.message, resData.type);
            } else if (resData.error) {
              setUpMessage(resData.error, "error");
            }
          });
      };

      checkBtn.addEventListener("click", checkBtnHandler);

      orderContainer.appendChild(checkoutItem);

      viewMealBtn.addEventListener("click", () => {
        modalHandler();
        viewHandler();
      });
    });
  }
};

const sideBarBtns = document.querySelectorAll(".sidebar__btn");

document.addEventListener("DOMContentLoaded", () => {
  setupTabs("sidebar__btn", "view-panel__content");
  const editBtn = document.querySelector("button[data-for-tab='edit']");
  editBtn.addEventListener("click", editHandler);
  sideBarBtns[0].click();
  sideBarBtns[1].addEventListener("click", reservationHandler);
  sideBarBtns[2].addEventListener("click", orderHandler);

  setupTabs("product__tab", "product__content");
  document.querySelector(".product__tab").click();
});
