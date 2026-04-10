document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen.toString());
      menu.setAttribute("aria-hidden", (!isOpen).toString());
    });

    const closeButton = document.getElementById("mobile-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
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
