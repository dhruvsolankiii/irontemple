// --- MOBILE NAV MENU TOGGLE ---
      const hamburgerBtn = document.getElementById("hamburger-btn");
      const navMenu = document.getElementById("nav-menu");
      const navLinks = document.querySelectorAll(".nav-link");

      hamburgerBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = hamburgerBtn.querySelector("i");
        if (navMenu.classList.contains("active")) {
          icon.className = "fa-solid fa-xmark";
        } else {
          icon.className = "fa-solid fa-bars";
        }
      });

      // Close mobile nav when clicking any link
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active");
          hamburgerBtn.querySelector("i").className = "fa-solid fa-bars";
        });
      });

      // --- STICKY NAV & ACTIVE NAVIGATION CODES ---
      const header = document.getElementById("header");
      const sections = document.querySelectorAll("section");

      window.addEventListener("scroll", () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }

        // Highlight active link
        let currentSec = "";
        sections.forEach((sec) => {
          const secTop = sec.offsetTop;
          const secHeight = sec.clientHeight;
          if (window.scrollY >= secTop - 150) {
            currentSec = sec.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(currentSec)) {
            link.classList.add("active");
          }
        });
      });

      // --- THEME TOGGLE FUNCTIONALITY ---
      const themeToggleBtn = document.getElementById("theme-toggle");

      themeToggleBtn.addEventListener("click", () => {
        const currentTheme =
          document.documentElement.getAttribute("data-theme");
        const icon = themeToggleBtn.querySelector("i");

        if (currentTheme === "light") {
          document.documentElement.removeAttribute("data-theme");
          icon.className = "fa-solid fa-moon";
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          icon.className = "fa-solid fa-sun";
        }
      });

      // --- BMI CALCULATOR CODE ---
      const bmiForm = document.getElementById("bmiForm");
      const bmiResult = document.getElementById("bmiResult");
      const bmiValue = document.getElementById("bmiValue");
      const bmiStatus = document.getElementById("bmiStatus");

      bmiForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const weight = parseFloat(document.getElementById("bmi-weight").value);
        const height =
          parseFloat(document.getElementById("bmi-height").value) / 100; // to meters

        if (weight > 0 && height > 0) {
          const bmi = (weight / (height * height)).toFixed(1);
          bmiValue.textContent = bmi;

          let status = "";
          let statusColor = "#ff3e3e";

          if (bmi < 18.5) {
            status = "Underweight";
            statusColor = "#ffb300";
          } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = "Normal Weight";
            statusColor = "#2e7d32";
          } else if (bmi >= 25 && bmi <= 29.9) {
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

      // --- TESTIMONIAL SLIDER ---
      const slides = document.querySelectorAll(".testimonial-slide");
      const dots = document.querySelectorAll(".slider-dot");
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
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
      }

      // Dot navigation click events
      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          clearInterval(slideInterval);
          const targetIndex = parseInt(dot.getAttribute("data-index"));
          showSlide(targetIndex);
          startAutoSlide();
        });
      });

      function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // changes every 5 seconds
      }

      startAutoSlide();

      // --- FAQ ACCORDION CODE ---
      const faqItems = document.querySelectorAll(".faq-item");

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
          const activeItem = document.querySelector(".faq-item.active");
          if (activeItem && activeItem !== item) {
            activeItem.classList.remove("active");
          }
          item.classList.toggle("active");
        });
      });

      // --- REGISTRATION FORM VALIDATION ---
      const registerForm = document.getElementById("registerForm");
      const successBox = document.getElementById("registerSuccess");

      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameField = document.getElementById("reg-name");
        const emailField = document.getElementById("reg-email");
        const phoneField = document.getElementById("reg-phone");
        const planField = document.getElementById("reg-plan");

        let isValid = true;

        // Name validation (min length 3)
        if (nameField.value.trim().length < 3) {
          document.getElementById("group-name").classList.add("invalid");
          isValid = false;
        } else {
          document.getElementById("group-name").classList.remove("invalid");
        }

        // Email validation regex pattern
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailField.value.trim())) {
          document.getElementById("group-email").classList.add("invalid");
          isValid = false;
        } else {
          document.getElementById("group-email").classList.remove("invalid");
        }

        // Phone validation (numbers only, min 10 digits)
        const phoneNum = phoneField.value.trim().replace(/\D/g, "");
        if (phoneNum.length < 10) {
          document.getElementById("group-phone").classList.add("invalid");
          isValid = false;
        } else {
          document.getElementById("group-phone").classList.remove("invalid");
        }

        // Plan validation
        if (planField.value === "") {
          document.getElementById("group-plan").classList.add("invalid");
          isValid = false;
        } else {
          document.getElementById("group-plan").classList.remove("invalid");
        }

        // Handle validation result
        if (isValid) {
          successBox.style.display = "block";
          registerForm.reset();
          // Scroll page back up slightly to let the success notice be seen
          successBox.scrollIntoView({ behavior: "smooth", block: "center" });

          // Hide notice after 6 seconds
          setTimeout(() => {
            successBox.style.display = "none";
          }, 6000);
        }
      });
