import { setUpMessage, highlightPasswordInput } from "../utility.js";

const form = document.querySelector(".form");
highlightPasswordInput(form);

const btn = form.querySelector("button");

const adminSignInUpBtnHandler = () => {
  const username = form.querySelector("[name='username']").value;
  const password = form.querySelector("[name='password']").value;

  fetch("/admin", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/admin/panel";
      }
      return res.json();
    })
    .then((resData) => {
      if (resData.error) {
        setUpMessage(resData.error, "error");
        return;
      }
      setUpMessage(resData.message, resData.type);
    });
};

btn.addEventListener("click", adminSignInUpBtnHandler);
