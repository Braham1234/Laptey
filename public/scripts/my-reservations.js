import { setUpMessage } from "./utility.js";

const reservationItems = document.querySelectorAll(".reservation-item");

function checkForEmptyReservation() {
  if (document.querySelector(".empty-reservation-message")) {
    return;
  }

  const hasReservationItem = document.querySelector(".reservation-item");
  if (!hasReservationItem) {
    const emptyReservationMessage = document.createElement("p");
    emptyReservationMessage.classList.add("empty-reservation-message");
    emptyReservationMessage.innerHTML = `You do not have any reservations. Please click
      <a href="/reservation">here</a> to reserve your table.`;

    const reservationItemsContainer =
      document.querySelector(".reservation-items");
    reservationItemsContainer.prepend(emptyReservationMessage);
  }
}

const deleteBtnHandler = (event) => {
  const btn = event.target;
  const reservationItem = btn.parentElement.parentElement;
  const reservationItemId = reservationItem.id;
  fetch(`/reservation/remove/${reservationItemId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        reservationItem.remove();
      }
      checkForEmptyReservation();
      return res.json();
    })
    .then((resData) => {
      setUpMessage(resData.message, resData.type);
    });
};

reservationItems.forEach((reservationItem) => {
  const deleteBtn = reservationItem.querySelector(
    ".reservation-item__btns [name='trash']"
  );
  deleteBtn.addEventListener("click", deleteBtnHandler);
});
