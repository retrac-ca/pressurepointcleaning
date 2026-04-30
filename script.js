document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const STORAGE_KEY = "ppc-theme-preference";

  function detectTimeBasedTheme() {
    const hour = new Date().getHours();
    return hour >= 20 || hour < 6 ? "dark" : "light";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);

    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19";
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const theme = saved === "dark" || saved === "light" ? saved : detectTimeBasedTheme();
    applyTheme(theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || detectTimeBasedTheme();
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  initTheme();

  const hamburger = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  const closeButton = document.getElementById("mobile-close");

  function setMenuOpen(isOpen) {
    if (!hamburger || !menu) return;

    menu.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen.toString());
    menu.setAttribute("aria-hidden", (!isOpen).toString());
  }

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      setMenuOpen(!menu.classList.contains("open"));
    });

    if (closeButton) {
      closeButton.addEventListener("click", () => setMenuOpen(false));
    }

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
  }

  const backToTop = document.getElementById("back-to-top");

  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("visible", window.scrollY > 520);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  const areaModal = document.getElementById("area-modal");
  const areaModalTitle = document.getElementById("area-modal-title");
  const areaModalCopy = document.getElementById("area-modal-copy");
  const areaPills = document.querySelectorAll(".area-pill");
  const areaCloseButtons = document.querySelectorAll("[data-area-close]");

  const areaDetails = {
    "Grand Falls": "Pressure Point Cleaning provides local pressure washing in Grand Falls for homes, driveways, decks, patios, siding, storefronts, and small commercial properties. Book online or send a quote request with your property details for a clear local estimate.",
    Edmundston: "For Edmundston properties, we offer exterior cleaning for siding, concrete, walkways, decks, fences, patios, and business entrances. Our pressure washing helps remove dirt, mildew, algae, oil staining, and seasonal buildup.",
    "Perth-Andover": "Pressure Point Cleaning serves Perth-Andover with residential and commercial pressure washing by appointment. We help refresh driveways, house exteriors, decks, patios, and high-traffic outdoor surfaces with practical local scheduling.",
    "Plaster Rock": "In Plaster Rock, we provide pressure washing for homes, camps, decks, concrete, patios, fencing, and small business properties. Request a quote and we can recommend the right cleaning approach for your surface.",
    "Saint-Leonard": "Pressure Point Cleaning supports Saint-Leonard homeowners and businesses with exterior pressure washing, driveway cleaning, siding washing, deck cleaning, patio cleaning, and seasonal property refreshes.",
    "Saint-Andre": "For Saint-Andre and nearby areas, we clean siding, driveways, decks, fences, patios, walkways, and commercial entrances. Contact us with photos or surface details and we will follow up with a straightforward quote."
  };

  function openAreaModal(town) {
    if (!areaModal || !areaModalTitle || !areaModalCopy) return;

    areaModalTitle.textContent = town;
    areaModalCopy.textContent = areaDetails[town] || "";
    areaModal.classList.add("open");
    areaModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeAreaModal() {
    if (!areaModal) return;

    areaModal.classList.remove("open");
    areaModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  areaPills.forEach((pill) => {
    pill.addEventListener("click", () => openAreaModal(pill.dataset.town));
  });

  areaCloseButtons.forEach((button) => {
    button.addEventListener("click", closeAreaModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAreaModal();
  });

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
