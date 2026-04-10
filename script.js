document.addEventListener("DOMContentLoaded", () => {
  // ── Theme switcher with time-of-day detection ────────────────────────
  const html = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const STORAGE_KEY = "ppc-theme-preference";

  function detectTimeBasedTheme() {
    const hour = new Date().getHours();
    return hour >= 20 || hour < 6 ? "dark" : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
      themeToggle.textContent = "☀️"; // sun emoji for dark mode
    } else {
      html.setAttribute("data-theme", "light");
      themeToggle.textContent = "🌙"; // moon emoji for light mode
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const theme = saved || detectTimeBasedTheme();
    applyTheme(theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  initTheme();

  // ── Mobile Navigation ───────────────────────────────────────────────
  const hamburger = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen.toString());
      menu.setAttribute("aria-hidden", (!isOpen).toString());
    });

    const closeButton = document.getElementById("mobile-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        menu.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
      });
    }
  }

  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("contextmenu", (event) => event.preventDefault());
    img.addEventListener("dragstart", (event) => event.preventDefault());
  });
});
