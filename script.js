document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = hamburgerBtn.querySelector("i");
      if (!icon) return;

      if (navMenu.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark";
      } else {
        icon.className = "fa-solid fa-bars";
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        const icon = hamburgerBtn.querySelector("i");
        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      });
    });
  }

  const header = document.getElementById("header");
  const sections = document.querySelectorAll("section");

  if (header && navLinks.length) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }

      let currentSec = "";
      sections.forEach((sec) => {
        const secTop = sec.offsetTop;
        if (window.scrollY >= secTop - 150) {
          currentSec = sec.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href") || "";
        if (href.includes(currentSec)) {
          link.classList.add("active");
        }
      });
    });
  }

  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const icon = themeToggleBtn.querySelector("i");

      if (currentTheme === "light") {
        document.documentElement.removeAttribute("data-theme");
        if (icon) icon.className = "fa-solid fa-moon";
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        if (icon) icon.className = "fa-solid fa-sun";
      }
    });
  }

  const bmiForm = document.getElementById("bmiForm");
  if (bmiForm) {
    const bmiResult = document.getElementById("bmiResult");
    const bmiValue = document.getElementById("bmiValue");
    const bmiStatus = document.getElementById("bmiStatus");

    bmiForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const weightField = document.getElementById("bmi-weight");
      const heightField = document.getElementById("bmi-height");

      if (!weightField || !heightField || !bmiValue || !bmiStatus || !bmiResult) return;

      const weight = parseFloat(weightField.value);
      const height = parseFloat(heightField.value) / 100;

      if (weight > 0 && height > 0) {
        const bmi = (weight / (height * height)).toFixed(1);
        bmiValue.textContent = bmi;

        let status = "";
        let statusColor = "#ff3e3e";

        if (Number(bmi) < 18.5) {
          status = "Underweight";
          statusColor = "#ffb300";
        } else if (Number(bmi) >= 18.5 && Number(bmi) <= 24.9) {
          status = "Normal Weight";
          statusColor = "#2e7d32";
        } else if (Number(bmi) >= 25 && Number(bmi) <= 29.9) {
          status = "Overweight";
          statusColor = "#ef6c00";
        } else {
          status = "Obese";
          statusColor = "#c62828";
        }

        bmiStatus.textContent = status;
        bmiStatus.style.color = statusColor;
        bmiResult.style.display = "block";
      }
    });
  }

  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".slider-dot");
  if (slides.length && dots.length) {
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      slides[index].classList.add("active");
      dots[index].classList.add("active");
      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        clearInterval(slideInterval);
        const targetIndex = parseInt(dot.getAttribute("data-index"), 10);
        showSlide(targetIndex);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });

    slideInterval = setInterval(nextSlide, 5000);
  }

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      const activeItem = document.querySelector(".faq-item.active");
      if (activeItem && activeItem !== item) {
        activeItem.classList.remove("active");
      }
      item.classList.toggle("active");
    });
  });

  const registerForm = document.getElementById("registerForm");
  const successBox = document.getElementById("registerSuccess");

  if (registerForm && successBox) {
    const setFieldState = (fieldId, valid, message = "") => {
      const field = document.getElementById(fieldId);
      const errorBox = document.getElementById(`${fieldId}Error`);
      if (!field) return;

      field.classList.toggle("is-invalid", !valid);
      field.classList.toggle("is-valid", valid && field.value.trim() !== "");

      if (errorBox) {
        errorBox.textContent = message;
        errorBox.style.display = message ? "block" : "none";
      }
    };

    const validateForm = () => {
      const nameField = document.getElementById("reg-name");
      const emailField = document.getElementById("reg-email");
      const phoneField = document.getElementById("reg-phone");
      const genderField = document.getElementById("reg-gender");
      const passwordField = document.getElementById("reg-password");
      const confirmField = document.getElementById("reg-confirm-password");
      const planField = document.getElementById("reg-plan");
      let isValid = true;

      if (!nameField || nameField.value.trim().length < 3) {
        setFieldState("reg-name", false, "Please enter your full name.");
        isValid = false;
      } else {
        setFieldState("reg-name", true);
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailField || !emailPattern.test(emailField.value.trim())) {
        setFieldState("reg-email", false, "Please enter a valid email address.");
        isValid = false;
      } else {
        setFieldState("reg-email", true);
      }

      if (phoneField) {
        const phoneNum = phoneField.value.trim().replace(/\D/g, "");
        if (phoneNum.length < 10) {
          setFieldState("reg-phone", false, "Please enter a valid 10-digit mobile number.");
          isValid = false;
        } else {
          setFieldState("reg-phone", true);
        }
      }

      if (!genderField || genderField.value === "") {
        setFieldState("reg-gender", false, "Please select your gender.");
        isValid = false;
      } else {
        setFieldState("reg-gender", true);
      }

      if (!passwordField || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(passwordField.value)) {
        setFieldState("reg-password", false, "Use 8+ chars, including uppercase, lowercase, number, and symbol.");
        isValid = false;
      } else {
        setFieldState("reg-password", true);
      }

      if (!confirmField || confirmField.value !== passwordField.value || confirmField.value === "") {
        setFieldState("reg-confirm-password", false, "Passwords do not match.");
        isValid = false;
      } else {
        setFieldState("reg-confirm-password", true);
      }

      if (planField && planField.value === "") {
        setFieldState("reg-plan", false, "Please select a plan.");
        isValid = false;
      } else if (planField) {
        setFieldState("reg-plan", true);
      }

      return isValid;
    };

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const isValid = validateForm();

      if (isValid) {
        successBox.style.display = "block";
        registerForm.reset();
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
          successBox.style.display = "none";
        }, 6000);
      }
    });
  }
});
