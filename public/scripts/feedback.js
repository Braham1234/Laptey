import { setUpMessage } from "./utility.js";

const form = document.querySelector(".container2__feedback");
const feedbackButton = form.querySelector("button");

const postUserInfo = (pathName) => {
  const dataHandler = () => {
    const fullName = form.querySelector("[name='fullName']").value;
    const email = form.querySelector("[name='email']").value;
    const stars = form.querySelector("[name='stars']:checked").value;
    const response = form.querySelector("[name='response']").value;

    fetch(pathName, {
      method: "POST",
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        stars: stars,
        response: response,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.error) {
          setUpMessage(resData.error, "error");
          return;
        } else if (resData.message) {
          setUpMessage(resData.message, resData.type);
        }
      });
  };

  feedbackButton.addEventListener("click", dataHandler);
};

const pathName = window.location.pathname;

postUserInfo(pathName);
