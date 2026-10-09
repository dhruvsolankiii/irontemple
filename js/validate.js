/**
 * IronTemple — Frontend Form Validation Script using jQuery
 * Validates Contact, Login, and Registration forms cleanly.
 */

$(document).ready(function () {
  // Demo-only credentials for the static frontend. Replace with server authentication in production.
  const DEMO_ACCOUNTS = {
    "admin@gmail.com": {
      password: "Admin@123",
      redirect: "admin/dashboard.html",
    },
    "user@gmail.com": {
      password: "User@123",
      redirect: "member/dashboard.html",
    },
  };

  /**
   * Validate a single input element
   * @param {HTMLElement|jQuery} input
   * @returns {boolean} isValid
   */
  function validateField(input) {
    const $field = $(input);
    const value = $field.val() ? $field.val().trim() : "";
    const rawValue = $field.val() || ""; // raw value preserving leading/trailing spaces for space checks
    const name = $field.attr("name") || $field.attr("id");
    const $errorSpan = $("#" + name + "Error");
    const validationType = $field.data("validation") || "";
    const minLength = parseInt($field.data("min")) || 0;
    const passwordId = $field.data("password-id");

    let errorMessage = "";

    // 1. Required Check
    if (validationType.includes("required")) {
      if (
        $field.attr("type") === "radio" ||
        $field.attr("type") === "checkbox"
      ) {
        const groupName = $field.attr("name");
        if ($(`input[name="${groupName}"]:checked`).length === 0) {
          errorMessage = "Please make a selection.";
        }
      } else if (
        value === "" ||
        ($field.is("select") && (value === "" || value === null))
      ) {
        errorMessage = "This field is required.";
      }
    }

    // 2. Email Validation
    if (!errorMessage && validationType.includes("email") && value !== "") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        errorMessage = "Please enter a valid email address.";
      }
    }

    // 3. Indian Mobile Number (10 digits starting with 6-9)
    if (!errorMessage && validationType.includes("phone") && value !== "") {
      const phonePattern = /^[6-9]\d{9}$/;
      if (!phonePattern.test(value)) {
        errorMessage = "Please enter a valid 10-digit Indian mobile number.";
      }
    }

    // 4. Name Validation (Letters and spaces only)
    if (!errorMessage && validationType.includes("name") && value !== "") {
      const namePattern = /^[a-zA-Z\s]{2,50}$/;
      if (!namePattern.test(value)) {
        errorMessage =
          "Please enter a valid name (letters only, min 2 characters).";
      }
    }

    // 5. Password Complexity Validation (Minimum 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char, no spaces)
    if (
      !errorMessage &&
      (validationType.includes("password") ||
        validationType.includes("strongPassword")) &&
      rawValue !== ""
    ) {
      if (/\s/.test(rawValue)) {
        errorMessage = "Password must not contain spaces.";
      } else if (rawValue.length < 8) {
        errorMessage = "Password must be at least 8 characters long.";
      } else if (!/[A-Z]/.test(rawValue)) {
        errorMessage =
          "Password must contain at least 1 uppercase letter (A-Z).";
      } else if (!/[a-z]/.test(rawValue)) {
        errorMessage =
          "Password must contain at least 1 lowercase letter (a-z).";
      } else if (!/\d/.test(rawValue)) {
        errorMessage = "Password must contain at least 1 number (0-9).";
      } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(rawValue)) {
        errorMessage =
          "Password must contain at least 1 special character (@, #, $, !, etc.).";
      }
    }

    // 6. Generic Minimum Length Validation
    if (
      !errorMessage &&
      validationType.includes("min") &&
      !validationType.includes("password") &&
      value !== ""
    ) {
      if (value.length < minLength) {
        errorMessage = `Must be at least ${minLength} characters long.`;
      }
    }

    // 7. Confirm Password Validation
    if (
      !errorMessage &&
      validationType.includes("confirmPassword") &&
      value !== ""
    ) {
      const targetPasswordVal = $("#" + passwordId).val() || "";
      if (rawValue !== targetPasswordVal) {
        errorMessage = "Passwords do not match.";
      }
    }

    // Apply validation classes & UI feedback
    const $target =
      $field.attr("type") === "radio" || $field.attr("type") === "checkbox"
        ? $(`input[name="${$field.attr("name")}"]`)
        : $field;

    if (errorMessage) {
      if ($errorSpan.length) {
        $errorSpan.text(errorMessage).show();
      }
      $target.addClass("is-invalid").removeClass("is-valid");
      return false;
    } else {
      if ($errorSpan.length) {
        $errorSpan.text("").hide();
      }
      if (value !== "" || validationType.includes("required")) {
        $target.removeClass("is-invalid").addClass("is-valid");
      } else {
        $target.removeClass("is-invalid is-valid");
      }
      return true;
    }
  }

  // Live real-time validation on user input
  $("input, textarea, select").on("input change blur", function () {
    if ($(this).data("validation")) {
      validateField(this);
    }
  });

  // Contact Form Submission Handler
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    let isFormValid = true;

    $(this)
      .find("[data-validation]")
      .each(function () {
        if (!validateField(this)) {
          isFormValid = false;
        }
      });

    if (isFormValid) {
      $("#contactSuccess").removeClass("d-none").fadeIn();
      $(this)[0].reset();
      $(this).find(".is-valid").removeClass("is-valid");
      setTimeout(function () {
        $("#contactSuccess").fadeOut(function () {
          $(this).addClass("d-none");
        });
      }, 5000);
    }
  });

  // Login Form Submission Handler
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    let isFormValid = true;

    $(this)
      .find("[data-validation]")
      .each(function () {
        if (!validateField(this)) {
          isFormValid = false;
        }
      });

    if (isFormValid) {
      const email = $("#login-email").val().trim().toLowerCase();
      const password = $("#login-password").val();
      const account = DEMO_ACCOUNTS[email];

      if (!account || account.password !== password) {
        $("#loginSuccess")
          .removeClass("alert-success")
          .addClass("alert-danger")
          .text(
            "Invalid email or password. Use one of the demo accounts listed below.",
          )
          .removeClass("d-none")
          .fadeIn();
        return;
      }

      $("#loginSuccess").removeClass("d-none").fadeIn();
      setTimeout(function () {
        window.location.href = account.redirect;
      }, 1500);
    }
  });

  // Register Form Submission Handler
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    let isFormValid = true;

    $(this)
      .find("[data-validation]")
      .each(function () {
        if (!validateField(this)) {
          isFormValid = false;
        }
      });

    if (isFormValid) {
      $("#registerSuccess").removeClass("d-none").fadeIn();
      $(this)[0].reset();
      $(this).find(".is-valid").removeClass("is-valid");
      window.scrollTo({
        top: $("#registerSuccess").offset().top - 100,
        behavior: "smooth",
      });
    }
  });

  // Password Visibility Toggle Handler (Eye Icon)
  $(document).on("click", ".toggle-password-btn", function () {
    const targetId = $(this).data("target");
    const $input = targetId
      ? $("#" + targetId)
      : $(this).closest(".input-group").find("input");
    const $icon = $(this).find("i");

    if ($input.attr("type") === "password") {
      $input.attr("type", "text");
      $icon.removeClass("fa-eye fa-regular").addClass("fa-eye-slash fa-solid");
    } else {
      $input.attr("type", "password");
      $icon.removeClass("fa-eye-slash fa-solid").addClass("fa-eye fa-regular");
    }
  });
});
