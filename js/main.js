/* ========================================================================
   Modern Energy Monitoring Dashboard - External JavaScript
   ======================================================================== */

// ========================================================================
// Initialize AOS (Animate On Scroll) for all pages
// ========================================================================
if (typeof AOS !== "undefined") {
  AOS.init();
}

// ========================================================================
// LOGIN PAGE LOGIC (index.html)
// ========================================================================
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the login page
  const togglePassword = document.getElementById("togglePassword");
  const loginForm = document.getElementById("loginForm");

  // Toggle password visibility (Login Page)
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("password");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.classList.replace("bi-eye", "bi-eye-slash");
      } else {
        passwordInput.type = "password";
        this.classList.replace("bi-eye-slash", "bi-eye");
      }
    });
  }

  // Handle login form submission (Login Page)
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const alertMessage = document.getElementById("alert-message");

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...';
      submitBtn.disabled = true;

      // Simulate API call delay
      setTimeout(() => {
        // Simulasi logika login
        if (username === "admin" && password) {
          // Show success message before redirect
          alertMessage.innerHTML = `
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <i class="bi bi-check-circle-fill me-2"></i>Login berhasil! Mengalihkan ke dashboard admin...
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

          // Redirect after a brief delay
          setTimeout(() => {
            window.location.href = "dashboard-admin.html";
          }, 1000);
        } else if (username === "user" && password) {
          // Show success message before redirect
          alertMessage.innerHTML = `
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <i class="bi bi-check-circle-fill me-2"></i>Login berhasil! Mengalihkan ke dashboard pengguna...
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

          // Redirect after a brief delay
          setTimeout(() => {
            window.location.href = "dashboard-user.html";
          }, 1000);
        } else {
          // Tampilkan pesan error
          alertMessage.innerHTML = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <i class="bi bi-exclamation-triangle-fill me-2"></i>Username atau password salah. Coba gunakan 'user' atau 'admin'.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

          // Reset button state
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
      }, 800);
    });
  }

  // ========================================================================
  // DASHBOARD ADMIN LOGIC (dashboard-admin.html)
  // ========================================================================

  // Initialize DataTables for Admin Dashboard
  if (typeof $ !== "undefined" && $.fn.DataTable) {
    $(document).ready(function () {
      // Device Table
      if ($("#deviceTable").length) {
        $("#deviceTable").DataTable({
          responsive: true,
          pageLength: 5,
          lengthMenu: [5, 10, 25, 50],
          scrollX: true,
          autoWidth: false,
        });
      }

      // Tips Table
      if ($("#tipsTable").length) {
        $("#tipsTable").DataTable({
          responsive: true,
          pageLength: 5,
          lengthMenu: [5, 10, 25, 50],
          scrollX: true,
          autoWidth: false,
        });
      }

      // Fix layout issues with DataTables on window resize
      $(window).on("resize", function () {
        if ($(".dataTable").length) {
          $(".dataTable").DataTable().columns.adjust();
        }
      });
    });
  }

  // Sidebar Toggle for Mobile (Admin Dashboard)
  const sidebarToggler = document.getElementById("sidebarToggler");
  if (sidebarToggler) {
    sidebarToggler.addEventListener("click", function () {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("active");

      // If sidebar is active (opened), add overlay
      if (sidebar.classList.contains("active")) {
        const overlay = document.createElement("div");
        overlay.id = "sidebar-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.right = "0";
        overlay.style.bottom = "0";
        overlay.style.backgroundColor = "rgba(0,0,0,0.4)";
        overlay.style.zIndex = "1040";
        document.body.appendChild(overlay);

        overlay.addEventListener("click", function () {
          sidebar.classList.remove("active");
          this.remove();
        });
      } else {
        // Remove overlay when sidebar is closed
        const existingOverlay = document.getElementById("sidebar-overlay");
        if (existingOverlay) {
          existingOverlay.remove();
        }
      }
    });
  }

  // Alert for demo actions (Admin Dashboard)
  document.addEventListener("click", function (e) {
    const target = e.target;

    // If we click on a button inside action-buttons
    if (
      target.tagName === "I" &&
      target.parentElement.classList.contains("btn")
    ) {
      e.preventDefault();
      alert("Fitur ini akan berfungsi di implementasi sebenarnya.");
    }

    // Save buttons in modals
    if (
      target.innerText === "Simpan Perangkat" ||
      target.innerText === "Simpan Tip"
    ) {
      e.preventDefault();
      alert("Data tersimpan! (Demo)");
      // Close modal
      if (typeof bootstrap !== "undefined") {
        const modal = bootstrap.Modal.getInstance(target.closest(".modal"));
        if (modal) modal.hide();
      }
    }
  });

  // ========================================================================
  // DASHBOARD USER LOGIC (dashboard-user.html)
  // ========================================================================

  // Chart.js setup for User Dashboard
  const usageChartCanvas = document.getElementById("usageChart");
  if (usageChartCanvas && typeof Chart !== "undefined") {
    const ctx = usageChartCanvas.getContext("2d");

    // Daily data
    const dailyData = {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
      datasets: [
        {
          label: "kWh",
          data: [0.8, 0.5, 0.9, 1.2, 0.7, 1.1, 0.9],
          borderColor: "#4361ee",
          backgroundColor: "rgba(67, 97, 238, 0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: "#4361ee",
        },
      ],
    };

    // Weekly data
    const weeklyData = {
      labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
      datasets: [
        {
          label: "kWh",
          data: [4.5, 5.0, 5.5, 4.8, 6.1, 7.0, 5.2],
          borderColor: "#4361ee",
          backgroundColor: "rgba(67, 97, 238, 0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: "#4361ee",
        },
      ],
    };

    // Monthly data
    const monthlyData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      datasets: [
        {
          label: "kWh",
          data: [120, 135, 125, 130, 142, 138, 145, 150, 147, 143, 139, 152],
          borderColor: "#4361ee",
          backgroundColor: "rgba(67, 97, 238, 0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: "#4361ee",
        },
      ],
    };

    // Chart configuration
    const chartConfig = {
      type: "line",
      data: weeklyData, // Default to weekly
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "kWh",
            },
            grid: {
              drawBorder: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: 10,
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 14,
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        animation: {
          duration: 1000,
        },
      },
    };

    // Create chart
    const usageChart = new Chart(ctx, chartConfig);

    // Period filter functionality
    document.querySelectorAll(".chart-filter").forEach((filter) => {
      filter.addEventListener("click", function () {
        // Remove active class from all filters
        document.querySelectorAll(".chart-filter").forEach((f) => {
          f.classList.remove("active");
        });

        // Add active class to clicked filter
        this.classList.add("active");

        // Update chart data based on selected period
        const period = this.dataset.period;
        if (period === "daily") {
          usageChart.data = dailyData;
        } else if (period === "weekly") {
          usageChart.data = weeklyData;
        } else if (period === "monthly") {
          usageChart.data = monthlyData;
        }

        // Update chart
        usageChart.update();
      });
    });
  }

  // ========================================================================
  // DARK MODE TOGGLE (All Dashboards)
  // ========================================================================
  const darkModeSwitch = document.getElementById("darkModeSwitch");
  if (darkModeSwitch) {
    const body = document.body;

    // Check for saved dark mode preference or use OS preference
    const isDarkMode =
      localStorage.getItem("darkMode") === "enabled" ||
      (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches &&
        localStorage.getItem("darkMode") !== "disabled");

    // Set initial state
    if (isDarkMode) {
      body.classList.add("dark-mode");
      darkModeSwitch.checked = true;
    }

    // Toggle dark mode
    darkModeSwitch.addEventListener("change", function () {
      if (this.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
      }
    });
  }
});
