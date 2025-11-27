document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,
      offset: 50,
    });
  }

  // Get current page
  const currentPage = window.location.pathname.split("/").pop();

  // Initialize based on current page
  if (currentPage === "index.html" || currentPage === "") {
    initializeLoginPage();
  } else if (currentPage === "dashboard-user.html") {
    initializeUserDashboard();
  } else if (currentPage === "user-grafik.html") {
    initializeUserGrafik();
  } else if (currentPage === "user-tips.html") {
    initializeUserTips();
  } else if (currentPage === "dashboard-admin.html") {
    initializeAdminDashboard();
  } else if (currentPage === "admin-perangkat.html") {
    initializeAdminPerangkat();
  } else if (currentPage === "admin-laporan.html") {
    initializeAdminLaporan();
  } else if (currentPage === "admin-tips.html") {
    initializeAdminTips();
  }
});

function initializeLoginPage() {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  // Password toggle
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      const icon = this.querySelector("i");
      icon.classList.toggle("bi-eye");
      icon.classList.toggle("bi-eye-slash");
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username === "admin" && password === "admin123") {
        window.location.href = "admin/dashboard-admin.html";
      } else if (username === "user" && password === "user123") {
        window.location.href = "user/dashboard-user.html";
      } else {
        alert("Username atau password salah!");
      }
    });
  }
}

function initializeUserDashboard() {
  // Initialize quick chart
  const quickChartCanvas = document.getElementById("quickChart");
  if (quickChartCanvas) {
    const ctx = quickChartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
        datasets: [
          {
            label: "Konsumsi (kWh)",
            data: [145, 162, 138, 171, 155, 148, 142],
            borderColor: "#0d6efd",
            backgroundColor: "rgba(13, 110, 253, 0.1)",
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
    const chartInstance = Chart.getChart(adminChartCanvas);
    let phase = 0;
    setInterval(() => {
      if (!chartInstance) return;
      const dev = chartInstance.data.datasets[1].data;
      phase += 0.6;
      const base = 20;
      const wave = Math.round(5 * Math.sin(phase));
      const jitter = Math.floor(Math.random() * 5) - 2; // -2..2
      const nextVal = Math.max(0, base + wave + jitter);
      dev.push(nextVal);
      dev.shift();
      chartInstance.update("none");
    }, 2500);
  }
}

function initializeUserGrafik() {
  // Period filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      updateCharts(this.getAttribute("data-period"));
    });
  });

  // Initialize main consumption chart
  const mainChartCanvas = document.getElementById("mainChart");
  if (mainChartCanvas) {
    const ctx = mainChartCanvas.getContext("2d");
    window.mainChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
        datasets: [
          {
            label: "Konsumsi (kWh)",
            data: [12, 8, 15, 28, 35, 42, 18],
            borderColor: "#0d6efd",
            backgroundColor: "rgba(13, 110, 253, 0.1)",
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Initialize device breakdown chart
  const deviceChartCanvas = document.getElementById("deviceChart");
  if (deviceChartCanvas) {
    const ctx = deviceChartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["AC", "Lampu", "Komputer", "Kulkas", "Lainnya"],
        datasets: [
          {
            data: [42, 18, 22, 12, 6],
            backgroundColor: [
              "#0d6efd",
              "#ffc107",
              "#198754",
              "#0dcaf0",
              "#6c757d",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              usePointStyle: true,
            },
          },
        },
      },
    });
  }

  // Initialize time distribution chart
  const timeChartCanvas = document.getElementById("timeChart");
  if (timeChartCanvas) {
    const ctx = timeChartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Pagi", "Siang", "Sore", "Malam"],
        datasets: [
          {
            label: "Konsumsi (kWh)",
            data: [35, 58, 72, 48],
            backgroundColor: [
              "rgba(255, 193, 7, 0.8)",
              "rgba(13, 110, 253, 0.8)",
              "rgba(220, 53, 69, 0.8)",
              "rgba(108, 117, 125, 0.8)",
            ],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}

function updateCharts(period) {
  // Chart data based on selected period
  let labels, data;

  if (period === "daily") {
    labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
    data = [12, 8, 15, 28, 35, 42, 18];
  } else if (period === "weekly") {
    labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    data = [145, 162, 138, 171, 155, 148, 142];
  } else if (period === "monthly") {
    labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    data = [612, 658, 584, 695];
  }

  if (window.mainChart) {
    window.mainChart.data.labels = labels;
    window.mainChart.data.datasets[0].data = data;
    window.mainChart.update();
  }
}

function initializeUserTips() {
  const categoryButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchTips");
  const tipCards = document.querySelectorAll(".tip-card-minimal");

  // Category filter
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      categoryButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");
      filterTips(category, searchInput ? searchInput.value : "");
    });
  });

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const activeCategory = document.querySelector(".filter-btn.active");
      const category = activeCategory
        ? activeCategory.getAttribute("data-category")
        : "all";
      filterTips(category, this.value);
    });
  }

  function filterTips(category, searchTerm) {
    tipCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      const cardTitle = card.querySelector("h5").textContent.toLowerCase();
      const cardText = card.querySelector("p").textContent.toLowerCase();

      const matchesCategory = category === "all" || cardCategory === category;
      const matchesSearch =
        searchTerm === "" ||
        cardTitle.includes(searchTerm.toLowerCase()) ||
        cardText.includes(searchTerm.toLowerCase());

      if (matchesCategory && matchesSearch) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    });
  }
}

function initializeAdminDashboard() {
  // Mobile Sidebar Toggle
  initializeMobileSidebar();

  const adminChartCanvas = document.getElementById("adminChart");
  if (adminChartCanvas) {
    const ctx = adminChartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
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
        ],
        datasets: [
          {
            label: "Konsumsi Total (kWh)",
            data: [
              4200, 4500, 4100, 4800, 4400, 4650, 4725, 4580, 4890, 4410, 4760,
            ],
            borderColor: "#0d6efd",
            backgroundColor: "rgba(13, 110, 253, 0.1)",
            tension: 0.4,
            fill: true,
            yAxisID: "y",
          },
          {
            label: "Perangkat Aktif",
            data: [9, 22, 18, 25, 19, 34, 27, 31, 24, 38, 33],
            borderColor: "#198754",
            backgroundColor: "rgba(25, 135, 84, 0.1)",
            tension: 0.5,
            fill: true,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 6000,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              callback: function (value) {
                return value >= 1000 ? value / 1000 + "k" : value;
              },
            },
          },
          y1: {
            beginAtZero: true,
            max: 60,
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}

function initializeAdminPerangkat() {
  // Initialize DataTables
  if (typeof $.fn.DataTable !== "undefined") {
    $("#devicesTable").DataTable({
      responsive: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/id.json",
      },
      order: [[0, "asc"]],
      pageLength: 10,
    });
  }

  // Form submission handlers
  const addForm = document.getElementById("addDeviceForm");
  if (addForm) {
    addForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Perangkat baru berhasil ditambahkan!");
      bootstrap.Modal.getInstance(
        document.getElementById("addDeviceModal")
      ).hide();
      this.reset();
    });
  }

  const editForm = document.getElementById("editDeviceForm");
  if (editForm) {
    editForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Perangkat berhasil diperbarui!");
      bootstrap.Modal.getInstance(
        document.getElementById("editDeviceModal")
      ).hide();
    });
  }

  // Delete button handlers
  document.querySelectorAll(".btn-outline-danger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (this.title === "Hapus") {
        if (confirm("Apakah Anda yakin ingin menghapus perangkat ini?")) {
          alert("Perangkat berhasil dihapus!");
        }
      }
    });
  });
}

function initializeAdminLaporan() {
  // Initialize DataTables
  if (typeof $.fn.DataTable !== "undefined") {
    $("#reportTable").DataTable({
      responsive: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/id.json",
      },
      order: [[0, "desc"]],
      pageLength: 10,
    });
  }

  // Initialize report chart
  const reportChartCanvas = document.getElementById("reportChart");
  if (reportChartCanvas) {
    const ctx = reportChartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan", "6 Jan", "7 Jan"],
        datasets: [
          {
            label: "Konsumsi (kWh)",
            data: [165, 178, 158, 192, 172, 168, 185],
            backgroundColor: "rgba(13, 110, 253, 0.8)",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Initialize distribution chart
  const distributionChartCanvas = document.getElementById("distributionChart");
  if (distributionChartCanvas) {
    const ctx = distributionChartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Ruang Server",
          "Ruang Kantor",
          "Meeting Room",
          "Cafetaria",
          "Lainnya",
        ],
        datasets: [
          {
            data: [32, 28, 18, 15, 7],
            backgroundColor: [
              "#0d6efd",
              "#198754",
              "#ffc107",
              "#dc3545",
              "#6c757d",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 12,
              usePointStyle: true,
            },
          },
        },
      },
    });
  }

  // Filter period change handler
  const filterPeriod = document.getElementById("filterPeriod");
  if (filterPeriod) {
    filterPeriod.addEventListener("change", function () {
      const customDateFields = document.querySelectorAll(
        "#filterStartDate, #filterEndDate"
      );
      if (this.value === "custom") {
        customDateFields.forEach((field) => (field.disabled = false));
      } else {
        customDateFields.forEach((field) => (field.disabled = true));
      }
    });
  }
}

function initializeAdminTips() {
  // Initialize DataTables
  if (typeof $.fn.DataTable !== "undefined") {
    $("#tipsTable").DataTable({
      responsive: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/id.json",
      },
      order: [[0, "asc"]],
      pageLength: 10,
    });
  }

  // Form submission handlers
  const addForm = document.getElementById("addTipForm");
  if (addForm) {
    addForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Tips baru berhasil ditambahkan!");
      bootstrap.Modal.getInstance(
        document.getElementById("addTipModal")
      ).hide();
      this.reset();
    });
  }

  const editForm = document.getElementById("editTipForm");
  if (editForm) {
    editForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Tips berhasil diperbarui!");
      bootstrap.Modal.getInstance(
        document.getElementById("editTipModal")
      ).hide();
    });
  }

  // Delete button handlers
  document.querySelectorAll(".btn-outline-danger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (this.title === "Hapus") {
        if (confirm("Apakah Anda yakin ingin menghapus tips ini?")) {
          alert("Tips berhasil dihapus!");
        }
      }
    });
  });
}

// Format number as currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Format date
function formatDate(date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

// Show notification
function showNotification(message, type = "success") {
  alert(message);
}

function initializeMobileSidebar() {
  // Check if we're on admin pages
  const adminSidebar = document.querySelector(".admin-sidebar");
  if (!adminSidebar) return;

  // Create mobile toggle button if not exists
  let toggleBtn = document.querySelector(".mobile-sidebar-toggle");
  if (!toggleBtn && window.innerWidth <= 992) {
    toggleBtn = document.createElement("button");
    toggleBtn.className = "mobile-sidebar-toggle";
    toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
    document.body.appendChild(toggleBtn);

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "mobile-sidebar-overlay";
    document.body.appendChild(overlay);

    // Toggle sidebar
    toggleBtn.addEventListener("click", function () {
      adminSidebar.classList.toggle("show");
      overlay.classList.toggle("show");
      const icon = this.querySelector("i");
      icon.classList.toggle("bi-list");
      icon.classList.toggle("bi-x");
    });

    // Close on overlay click
    overlay.addEventListener("click", function () {
      adminSidebar.classList.remove("show");
      overlay.classList.remove("show");
      toggleBtn.querySelector("i").classList.remove("bi-x");
      toggleBtn.querySelector("i").classList.add("bi-list");
    });

    // Close on nav item click
    document.querySelectorAll(".sidebar-nav-item").forEach((item) => {
      item.addEventListener("click", function () {
        if (window.innerWidth <= 992) {
          adminSidebar.classList.remove("show");
          overlay.classList.remove("show");
          toggleBtn.querySelector("i").classList.remove("bi-x");
          toggleBtn.querySelector("i").classList.add("bi-list");
        }
      });
    });
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      adminSidebar.classList.remove("show");
      const overlay = document.querySelector(".mobile-sidebar-overlay");
      if (overlay) overlay.classList.remove("show");
      if (toggleBtn) {
        toggleBtn.querySelector("i").classList.remove("bi-x");
        toggleBtn.querySelector("i").classList.add("bi-list");
      }
    }
  });
}

// Initialize mobile sidebar for all admin pages
document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.pathname.includes("admin-perangkat.html") ||
    window.location.pathname.includes("admin-laporan.html") ||
    window.location.pathname.includes("admin-tips.html")
  ) {
    initializeMobileSidebar();
  }
});

// Export functions if using modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    formatCurrency,
    formatDate,
    showNotification,
  };
}
