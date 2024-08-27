document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loadingScreen");
  const darkModeButton = document.getElementById("darkModeButton");
  const darkModeIcon = document.getElementById("darkModeIcon");

  // Función para mostrar la pantalla de carga
  const showLoadingScreen = () => {
    loadingScreen.classList.remove("hidden");
    const randomTime = Math.random() * 3000 + 2000; // Entre 2 y 5 segundos

    // Ocultar la pantalla de carga después de un tiempo aleatorio
    setTimeout(() => loadingScreen.classList.add("hidden"), randomTime);
  };

  // Función para ocultar la pantalla de carga
  const hideLoadingScreen = () => loadingScreen.classList.add("hidden");

  // Mostrar la pantalla de carga al cargar la página
  showLoadingScreen();

  // Ocultar la pantalla de carga al hacer clic en ella
  loadingScreen.addEventListener("click", hideLoadingScreen);

  // Alternar el modo oscuro
  const toggleDarkMode = () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    darkModeIcon.textContent = isDarkMode ? "light_mode" : "contrast";
    localStorage.setItem("darkMode", isDarkMode);
  };

  darkModeButton.addEventListener("click", toggleDarkMode);

  // Inicializar el modo oscuro basado en la preferencia guardada
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkModeIcon.textContent = "light_mode";
  }

  // Función para mostrar una sección específica con la pantalla de carga
  window.showSection = function (sectionId) {
    showLoadingScreen();
    setTimeout(() => {
      hideLoadingScreen();
      document
        .querySelectorAll(".section")
        .forEach((section) => section.classList.remove("active"));
      document.getElementById(sectionId).classList.add("active");
    }, 2000); // Usamos un tiempo fijo aquí para evitar inconsistencias

    // Actualizar la pantalla de carga para los clics
    loadingScreen.removeEventListener("click", hideLoadingScreen); // Para evitar agregar múltiples event listeners
    loadingScreen.addEventListener("click", hideLoadingScreen);
  };
});
