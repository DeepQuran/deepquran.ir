const getStoredTheme = () => localStorage.getItem("theme");
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);
const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
const setTheme = (theme) => {
  if (theme === "auto") {
    document.documentElement.setAttribute(
      "data-bs-theme",
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  } else {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }
};

const updateThemeIcon = (theme) => {
  const themeIcon = document.querySelector("#themeIcon");
  if (theme === "dark") {
    themeIcon.classList.remove("bi-moon");
    themeIcon.classList.add("bi-sun");
  } else {
    themeIcon.classList.remove("bi-sun");
    themeIcon.classList.add("bi-moon");
  }
};

const showActiveTheme = (theme, focus = false) => {
  const themeSwitcher = document.querySelector("#toggleTheme");
  if (!themeSwitcher) return;
  updateThemeIcon(theme);
  const btnToActive = document.querySelector(
    `[data-bs-theme-value="${theme}"]`
  );
  document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
    element.classList.remove("active");
    element.setAttribute("aria-pressed", "false");
  });
  btnToActive.classList.add("active");
  btnToActive.setAttribute("aria-pressed", "true");
  if (focus) {
    themeSwitcher.focus();
  }
};

const initializeTheme = () => {
  const preferredTheme = getPreferredTheme();
  setTheme(preferredTheme);
  updateThemeIcon(preferredTheme);
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== "light" && storedTheme !== "dark") {
      const preferredTheme = getPreferredTheme();
      setTheme(preferredTheme);
      updateThemeIcon(preferredTheme);
    }
  });

document.querySelector("#toggleTheme").addEventListener("click", () => {
  const theme = getStoredTheme() === "light" ? "dark" : "light";
  setStoredTheme(theme);
  setTheme(theme);
  updateThemeIcon(theme);
});

document.querySelector("#toggleLanguage").addEventListener("click", () => {
  const currentLang = document.documentElement.lang;
  const newLang = currentLang === "fa" ? "en" : "fa";
  document.documentElement.lang = newLang;
  window.location.href =
    newLang === "fa" ? "../index.html" : "../en/index.html";
});

// Initialize theme on page load
initializeTheme();

// i.e quran.html?open=itm3&part=thisPart
document.addEventListener("DOMContentLoaded", function () {
  // Get the query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const openItem = urlParams.get("open");
  const scrollToPart = urlParams.get("part");

  // If the query parameter for opening an item is present, open the corresponding accordion item
  if (openItem) {
    const button = document.getElementById(`btn-${openItem}`);
    if (button) {
      button.classList.remove("collapsed");
      const collapseElement = document.getElementById(openItem);
      collapseElement.classList.add("show");
      button.setAttribute("aria-expanded", "true");

      // If the query parameter for scrolling to a part is present, scroll to that part
      if (scrollToPart) {
        const partElement = document.querySelector(
          `#${openItem} [name="${scrollToPart}"]`
        );
        if (partElement) {
          partElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }
});

function copyToClipboard() {
  const url = window.location.href;
  const el = document.createElement("textarea");
  el.value = url;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("لینک کپی شد!");
}
