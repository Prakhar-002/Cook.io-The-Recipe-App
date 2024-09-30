/*
      ! https://github.com/Prakhar-002
      ? © prakhar.katiyar.002@gmail.com
*/ 

"use strict";

const /*Node Element */ html = document.documentElement;
const /* Boolean */ isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if(sessionStorage.getItem("theme")) {
      html.dataset.theme = sessionStorage.getItem("theme");
} else {
      html.dataset.theme = isDark ? "dark" : "light";
}

let isPressed = false;

const changeTheme = function () {
      isPressed = isPressed ? false : true;
      this.setAttribute("aria-pressed", isPressed);
      html.setAttribute("data-theme", (html.dataset.theme === "light") ? "dark" : "light");
      sessionStorage.setItem("theme", html.dataset.theme);
}

window.addEventListener("load", function(){
      const /*Node Element */ themeBtn = this.document.querySelector("[data-theme-btn]");

      themeBtn.addEventListener("click", changeTheme)
});