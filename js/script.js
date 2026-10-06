/**
 * IronTemple — General Interaction Script
 */

document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html") || (currentPath === "irontemple.html" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const navbar = document.querySelector(".navbar-custom");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
      } else {
        navbar.style.boxShadow = "none";
      }
    });
  }

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!trigger || !answer) return;

    const syncState = () => {
      const isOpen = item.classList.contains("active");
      trigger.setAttribute("aria-expanded", String(isOpen));
      answer.hidden = !isOpen;
    };

    syncState();

    trigger.addEventListener("click", () => {
      const shouldOpen = !item.classList.contains("active");

      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active");
        const faqTrigger = faqItem.querySelector(".faq-question");
        const faqAnswer = faqItem.querySelector(".faq-answer");
        if (faqTrigger) faqTrigger.setAttribute("aria-expanded", "false");
        if (faqAnswer) faqAnswer.hidden = true;
      });

      if (shouldOpen) {
        item.classList.add("active");
      }

      syncState();
    });
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});
