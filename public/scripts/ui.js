const password_input_field = document.getElementById("password_input_field");
if (password_input_field) {
  const password_toggle_btn = document.getElementById("password_toggle_btn");
  const password_eye = password_toggle_btn.querySelector("ion-icon");

  const togglePassword = () => {
    const type =
      password_input_field.getAttribute("type") === "password"
        ? "text"
        : "password";
    password_input_field.setAttribute("type", type);

    if (type === "password") {
      password_eye.setAttribute("name", "eye-outline");
    } else if (type === "text") {
      password_eye.setAttribute("name", "eye-off-outline");
    }
  };

  password_toggle_btn.addEventListener("click", togglePassword);
}

if (document.querySelector(".user-btns")) {
  const avatarBtn = document.querySelector(".user__btn");
  const dropMenu = document.querySelector(".user__menu");

  const toggleDropMenu = () => {
    // alert("hello world");
    dropMenu.classList.toggle("show-drop-menu");
  };

  avatarBtn.addEventListener("click", toggleDropMenu);

  const signOutBtn = document.getElementById("signout-btn");

  const signOutHandler = () => {
    fetch("/signout", {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/";
        }
        return res.json();
      })
      .then((resData) => console.log(resData.message));
  };

  signOutBtn.addEventListener("click", signOutHandler);
}
