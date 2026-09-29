/**
 * IronTemple — General Interaction Script
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Highlight Active Page Nav Link based on Current URL
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

  // 2. Sticky Navbar Border Shadow on Scroll
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
});
