import { setUpMessage, highlightPasswordInput } from "./utility.js";

const form = document.querySelector(".form-container");
highlightPasswordInput(form);

const signInOrUpBtn = form.querySelector("button");

const postUserInfo = (pathName) => {
  const signInOrUpHandler = () => {
    const email = form.querySelector("[name='email']").value;
    const password = form.querySelector("[name='password'").value;

    const userFullName =
      pathName === "/signup"
        ? form.querySelector("[name='fullName']").value
        : null;

    fetch(pathName, {
      method: "POST",
      body: JSON.stringify({
        fullName: userFullName,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/";
        }
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

  signInOrUpBtn.addEventListener("click", signInOrUpHandler);
};

const pathName = window.location.pathname;

postUserInfo(pathName);
