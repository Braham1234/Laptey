import { setUpMessage } from "./utility.js";

const form = document.querySelector(".form-container");
const reservationButton = form.querySelector("button");

const postUserInfo = (pathName) => {
  const dataHandler = () => {
    const occassion = form.querySelector("[name='occassion']").value;
    const partySize = form.querySelector("[name='party-size']").value;
    const tableRequired = form.querySelector("[name='required-table']").value;
    const date = form.querySelector("[name='date']").value;
    const startingTime = form.querySelector("[name='starting-time']").value;
    const endingTime = form.querySelector("[name='ending-time']").value;

    fetch(pathName, {
      method: "POST",
      body: JSON.stringify({
        occassion: occassion,
        partySize: partySize,
        tableRequired: tableRequired,
        date: date,
        startingTime: startingTime,
        endingTime: endingTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setUpMessage(resData.message, resData.type);
      });
  };

  reservationButton.addEventListener("click", dataHandler);
};

const pathName = window.location.pathname;

postUserInfo(pathName);
