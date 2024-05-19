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
  window.location.href = newLang === "fa" ? "../fa/index.html" : "../en/index.html";
});

// Initialize theme on page load
initializeTheme();
