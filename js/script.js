/**
 * IronTemple — General Interaction & Portal Application Script
 * Consolidated frontend interactivity module.
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Navigation Active Link Highlighting
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPath ||
      (currentPath === "" && href === "index.html") ||
      (currentPath === "irontemple.html" && href === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 2. Navbar Box Shadow on Scroll
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

  // 3. Mobile Hamburger Menu Toggle
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

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

  // 4. Dark / Light Theme Toggle
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

  // 5. FAQ Accordion Toggle
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

  // 6. Dynamic Current Year
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // 7. BMI Calculator Handling
  const bmiForm = document.getElementById("bmiForm");
  if (bmiForm) {
    const weightInput = document.getElementById("bmi-weight");
    const heightInput = document.getElementById("bmi-height");
    const resultCard = document.getElementById("bmiResult");
    const bmiValueElem = document.getElementById("bmiValue");
    const bmiStatusElem = document.getElementById("bmiStatus");
    const bmiDescElem = document.getElementById("bmiDesc");
    const weightError = document.getElementById("bmiWeightError");
    const heightError = document.getElementById("bmiHeightError");

    bmiForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      const weightVal = parseFloat(weightInput.value);
      const heightVal = parseFloat(heightInput.value);

      if (!weightInput.value.trim() || isNaN(weightVal) || weightVal <= 0) {
        if (weightError) {
          weightError.textContent = "Please enter a valid positive weight in kg.";
          weightError.style.display = "block";
        }
        weightInput.classList.add("is-invalid");
        isValid = false;
      } else {
        if (weightError) weightError.style.display = "none";
        weightInput.classList.remove("is-invalid");
        weightInput.classList.add("is-valid");
      }

      if (!heightInput.value.trim() || isNaN(heightVal) || heightVal <= 0) {
        if (heightError) {
          heightError.textContent = "Please enter a valid positive height in cm.";
          heightError.style.display = "block";
        }
        heightInput.classList.add("is-invalid");
        isValid = false;
      } else {
        if (heightError) heightError.style.display = "none";
        heightInput.classList.remove("is-invalid");
        heightInput.classList.add("is-valid");
      }

      if (isValid) {
        const heightInMeters = heightVal / 100;
        const bmi = (weightVal / (heightInMeters * heightInMeters)).toFixed(1);

        if (bmiValueElem) bmiValueElem.textContent = bmi;

        let category = "";
        let categoryColor = "";
        let desc = "";

        if (bmi < 18.5) {
          category = "Underweight";
          categoryColor = "#f59e0b";
          desc = "Your BMI suggests you are underweight. Consider consulting a trainer for a muscle-building plan.";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
          category = "Normal Weight";
          categoryColor = "#10b981";
          desc = "Congratulations! Your BMI falls within the healthy weight range. Keep up your fitness routine!";
        } else if (bmi >= 25 && bmi <= 29.9) {
          category = "Overweight";
          categoryColor = "#f97316";
          desc = "Your BMI indicates you are overweight. A balanced cardio and strength regimen can help optimize health.";
        } else {
          category = "Obese";
          categoryColor = "#ef4444";
          desc = "Your BMI falls in the obese category. Our expert coaches can build a tailored, progressive wellness plan for you.";
        }

        if (bmiStatusElem) {
          bmiStatusElem.textContent = category;
          bmiStatusElem.style.color = categoryColor;
        }
        if (bmiDescElem) {
          bmiDescElem.textContent = desc;
        }

        if (resultCard) {
          resultCard.style.display = "block";
          resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    });
  }

  // 8. Portal Sidebar & Navigation Controls (Admin / Member)
  const sidebar = document.querySelector(".portal-sidebar");
  const toggle = document.querySelector("[data-portal-menu]");

  if (sidebar && toggle) {
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("is-open");
      toggle.setAttribute(
        "aria-expanded",
        String(sidebar.classList.contains("is-open"))
      );
    });

    document.addEventListener("click", function (event) {
      if (
        sidebar.classList.contains("is-open") &&
        !sidebar.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        sidebar.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.querySelectorAll(".portal-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        sidebar.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 9. Portal Live Table Search & Filter
  document.querySelectorAll("[data-table-filter]").forEach(function (input) {
    const table = document.querySelector(input.dataset.tableFilter);
    if (!table) return;

    input.addEventListener("input", function () {
      const query = input.value.trim().toLowerCase();
      table.querySelectorAll("tbody tr").forEach(function (row) {
        row.hidden =
          query !== "" && !row.textContent.toLowerCase().includes(query);
      });
    });
  });

  // 10. Portal CRUD Operations & Modal Management
  function showAlert(message, type) {
    const alert = document.querySelector("[data-portal-alert]");
    if (!alert) return;
    alert.textContent = message;
    alert.className = "alert alert-" + (type || "success");
    window.setTimeout(function () {
      alert.classList.add("d-none");
    }, 3500);
  }

  function getModal() {
    let modal = document.getElementById("portalCrudModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "portalCrudModal";
    modal.className = "modal fade";
    modal.tabIndex = -1;
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close portal-crud-close" aria-label="Close"></button>
          </div>
          <form class="portal-crud-form">
            <div class="modal-body">
              <div class="portal-crud-fields"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-danger d-none portal-crud-delete">Delete</button>
              <button type="button" class="btn btn-light portal-crud-close">Cancel</button>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal
      .querySelectorAll(".portal-crud-close")
      .forEach(function (closeButton) {
        closeButton.addEventListener("click", function () {
          modal.classList.remove("show");
          modal.style.display = "none";
        });
      });
    return modal;
  }

  const crudSchemas = {
    members: {
      title: "Member",
      fields: [
        ["fullName", "Full name", "text"],
        ["email", "Email address", "email"],
        ["phone", "Phone number", "tel"],
        [
          "plan",
          "Membership plan",
          "select",
          ["Basic Plan", "Pro Plan", "Elite Plan"],
        ],
        [
          "status",
          "Membership status",
          "select",
          ["Active", "Expiring", "Inactive"],
        ],
      ],
    },
    memberships: {
      title: "Membership plan",
      fields: [
        ["name", "Plan name", "text"],
        ["price", "Price", "number"],
        [
          "billing",
          "Billing period",
          "select",
          ["Monthly", "Quarterly", "Half-yearly", "Yearly"],
        ],
        ["description", "Description", "textarea"],
        ["status", "Status", "select", ["Active", "Inactive"]],
      ],
    },
    trainers: {
      title: "Trainer",
      fields: [
        ["name", "Full name", "text"],
        ["email", "Email address", "email"],
        ["specialization", "Specialization", "text"],
        ["availability", "Availability", "text"],
        ["status", "Status", "select", ["Active", "On leave", "Inactive"]],
      ],
    },
    bookings: {
      title: "Booking",
      fields: [
        ["member", "Member name", "text"],
        ["trainer", "Trainer name", "text"],
        ["type", "Session type", "text"],
        ["date", "Date and time", "datetime-local"],
        [
          "status",
          "Status",
          "select",
          ["Pending", "Confirmed", "Approved", "Cancelled"],
        ],
      ],
    },
    payments: {
      title: "Payment",
      fields: [
        ["member", "Member name", "text"],
        ["amount", "Amount", "number"],
        [
          "method",
          "Payment method",
          "select",
          ["Card", "UPI", "Cash", "Bank transfer"],
        ],
        ["date", "Payment date", "date"],
        [
          "status",
          "Status",
          "select",
          ["Paid", "Pending", "Failed", "Refunded"],
        ],
      ],
    },
    attendance: {
      title: "Attendance record",
      fields: [
        ["member", "Member name", "text"],
        ["date", "Date", "date"],
        ["checkIn", "Check-in time", "time"],
        ["checkOut", "Check-out time", "time"],
        ["status", "Status", "select", ["Present", "Absent", "Late"]],
      ],
    },
    messages: {
      title: "Message",
      fields: [
        ["member", "Member name", "text"],
        ["subject", "Subject", "text"],
        ["message", "Message", "textarea"],
        [
          "status",
          "Status",
          "select",
          ["Open", "Pending", "Responded", "Closed"],
        ],
      ],
    },
    settings: {
      title: "Gym settings",
      fields: [
        ["gymName", "Gym name", "text"],
        ["email", "Contact email", "email"],
        ["phone", "Contact phone", "tel"],
        ["address", "Address", "textarea"],
      ],
    },
  };

  function getCrudSchema() {
    const page = window.location.pathname.split("/").pop().replace(".html", "");
    return (
      crudSchemas[page] || {
        title: "Record",
        fields: [
          ["name", "Name or title", "text"],
          ["detail", "Details", "text"],
          ["status", "Status or notes", "text"],
        ],
      }
    );
  }

  function openCrudModal(button) {
    const modal = getModal();
    const row = button.closest("tr");
    const schema = getCrudSchema();
    const rawAction = (button.dataset.crudAction || "Update")
      .replace(/is demo action\.?/i, "")
      .trim();
    let operation = "Update";
    if (/add|create|new/i.test(rawAction))
      operation = /create/i.test(rawAction) ? "Create" : "Add";
    if (/edit|details|update|save/i.test(rawAction))
      operation = /details/i.test(rawAction) ? "View / edit" : "Edit";
    const title = modal.querySelector(".modal-title");
    const fields = modal.querySelector(".portal-crud-fields");
    const deleteButton = modal.querySelector(".portal-crud-delete");
    const form = modal.querySelector(".portal-crud-form");
    const values = row
      ? Array.from(row.querySelectorAll("td"))
          .slice(0, 3)
          .map(function (cell) {
            return cell.textContent.trim();
          })
      : [];

    title.textContent = operation + " " + schema.title.toLowerCase();
    deleteButton.classList.toggle("d-none", !row);
    fields.innerHTML = schema.fields
      .map(function (field, index) {
        const id = "crud-" + field[0];
        const value = values[index] || "";
        let control = `<input id="${id}" name="${field[0]}" type="${field[2]}" class="form-control" value="${value}"`;
        if (field[2] === "textarea") {
          control = `<textarea id="${id}" name="${field[0]}" class="form-control" rows="3">${value}</textarea>`;
        } else if (field[2] === "select") {
          control = `<select id="${id}" name="${field[0]}" class="form-select">${field[3]
            .map(function (option) {
              return `<option${option === value ? " selected" : ""}>${option}</option>`;
            })
            .join("")}</select>`;
        } else {
          control += index === 0 ? " required>" : ">";
        }
        if (index === 0 && field[2] === "textarea") {
          control = control.replace("<textarea ", "<textarea required ");
        }
        return `<div class="mb-3"><label class="form-label" for="${id}">${field[1]}</label>${control}</div>`;
      })
      .join("");

    form.onsubmit = function (event) {
      event.preventDefault();
      const record = { updatedAt: new Date().toISOString() };
      schema.fields.forEach(function (field) {
        const input = fields.querySelector("[name='" + field[0] + "']");
        record[field[0]] = input ? input.value.trim() : "";
      });
      const records = JSON.parse(
        localStorage.getItem("irontemple-admin-records") || "[]"
      );
      records.push(record);
      localStorage.setItem("irontemple-admin-records", JSON.stringify(records));
      if (row) {
        const cells = row.querySelectorAll("td");
        schema.fields
          .slice(0, cells.length - 1)
          .forEach(function (field, index) {
            if (cells[index]) cells[index].textContent = record[field[0]];
          });
      } else {
        const tableBody = document.querySelector("table tbody");
        if (tableBody) {
          const newRow = document.createElement("tr");
          schema.fields.slice(0, 3).forEach(function (field) {
            const cell = document.createElement("td");
            cell.textContent = record[field[0]];
            newRow.appendChild(cell);
          });
          const actionCell = document.createElement("td");
          const editButton = document.createElement("button");
          editButton.type = "button";
          editButton.className = "btn btn-sm btn-light";
          editButton.dataset.crudAction = "Edit record";
          editButton.textContent = "Edit";
          actionCell.appendChild(editButton);
          newRow.appendChild(actionCell);
          tableBody.appendChild(newRow);
          editButton.addEventListener("click", function () {
            openCrudModal(this);
          });
        }
      }
      modal.classList.remove("show");
      modal.style.display = "none";
      showAlert(schema.title + " saved successfully.");
    };

    deleteButton.onclick = function () {
      if (row) row.remove();
      modal.classList.remove("show");
      modal.style.display = "none";
      showAlert("Record deleted successfully.");
    };
    modal.classList.add("show");
    modal.style.display = "block";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
  }

  document.querySelectorAll("[data-crud-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (/export/i.test(button.dataset.crudAction || "")) {
        const table = document.querySelector("table");
        if (!table) {
          showAlert("There is no table to export on this page.", "warning");
          return;
        }
        const csv = Array.from(table.querySelectorAll("tr"))
          .map(function (row) {
            return Array.from(row.querySelectorAll("th, td"))
              .map(function (cell) {
                return '"' + cell.textContent.trim().replace(/"/g, '""') + '"';
              })
              .join(",");
          })
          .join("\n");
        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
        link.download =
          document.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".csv";
        link.click();
        URL.revokeObjectURL(link.href);
        showAlert("Export downloaded successfully.");
        return;
      }
      openCrudModal(button);
    });
  });
});
