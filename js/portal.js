document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".portal-sidebar");
  const toggle = document.querySelector("[data-portal-menu]");

  if (sidebar && toggle) {
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(sidebar.classList.contains("is-open")));
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

  document.querySelectorAll("[data-table-filter]").forEach(function (input) {
    const table = document.querySelector(input.dataset.tableFilter);
    if (!table) return;

    input.addEventListener("input", function () {
      const query = input.value.trim().toLowerCase();
      table.querySelectorAll("tbody tr").forEach(function (row) {
        row.hidden = query !== "" && !row.textContent.toLowerCase().includes(query);
      });
    });
  });

  document.querySelectorAll("[data-demo-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      const message = button.dataset.demoAction || "This action is demo action.";
      const alert = document.querySelector("[data-portal-alert]");
      if (!alert) return;
      alert.textContent = message;
      alert.classList.remove("d-none");
      window.setTimeout(function () {
        alert.classList.add("d-none");
      }, 3500);
    });
  });
});
