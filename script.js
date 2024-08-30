document.addEventListener("DOMContentLoaded", function () {
  // Variables de elementos
  const loadingScreen = document.getElementById("loadingScreen");
  const darkModeButton = document.getElementById("darkModeButton");
  const darkModeIcon = document.getElementById("darkModeIcon");
  const productsContainer = document.querySelector(".products-grid");
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const notification = document.getElementById("notification");

  // Función para mostrar la pantalla de carga
  const showLoadingScreen = () => {
    loadingScreen.classList.remove("hidden");
    const randomTime = Math.random() * 3000 + 2000; // Entre 2 y 5 segundos
    setTimeout(() => loadingScreen.classList.add("hidden"), randomTime);
  };

  // Función para ocultar la pantalla de carga
  const hideLoadingScreen = () => loadingScreen.classList.add("hidden");

  // Mostrar y ocultar pantalla de carga al cargar la página
  showLoadingScreen();
  loadingScreen.addEventListener("click", hideLoadingScreen);

  // Alternar el modo oscuro
  const toggleDarkMode = () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    darkModeIcon.textContent = isDarkMode ? "light_mode" : "dark_mode";
    localStorage.setItem("darkMode", isDarkMode);
  };

  darkModeButton.addEventListener("click", toggleDarkMode);

  // Inicializar el modo oscuro basado en la preferencia guardada
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkModeIcon.textContent = "light_mode";
  }

  // Función para mostrar una sección específica
  window.showSection = function (sectionId) {
    showLoadingScreen();
    setTimeout(() => {
      hideLoadingScreen();
      document
        .querySelectorAll(".section")
        .forEach((section) => section.classList.remove("active"));
      document.getElementById(sectionId).classList.add("active");
    }, 2000);
    loadingScreen.removeEventListener("click", hideLoadingScreen);
    loadingScreen.addEventListener("click", hideLoadingScreen);
  };

  // Función para extraer datos de productos
  function extractProductData() {
    const products = [];
    productsContainer.querySelectorAll(".product-card").forEach((card) => {
      const id = card.querySelector("button").getAttribute("data-id");
      const name = card.querySelector("h3").textContent;
      const price = card
        .querySelector(".price")
        .textContent.replace("US$", "")
        .trim();
      const image = card.querySelector("img").getAttribute("src");
      products.push({ id, name, price, image });
    });
    return products;
  }

  // Función para agregar al carrito
  function addToCart(productId, productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: parseFloat(productPrice), // Asegurarse de que el precio sea un número
        image: productImage,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay(); // Actualizar la visualización del carrito
    showNotification(productName); // Mostrar mensaje de confirmación
  }

  // Función para mostrar los productos en el carrito
  function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartContainer.innerHTML = ""; // Limpiar contenido actual

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="price">$${item.price.toFixed(2)}</p>
          <p>Cantidad: ${item.quantity}</p>
        </div>
      `;
      cartContainer.appendChild(cartItem);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // Función para mostrar mensaje de confirmación
  function showNotification(productName) {
    notification.textContent = `${productName} ha sido agregado al carrito`;
    notification.classList.add("visible");
    setTimeout(() => {
      notification.classList.remove("visible");
    }, 3000); // Mostrar mensaje por 3 segundos
  }

  // Actualizar la visualización del carrito al cargar la página
  updateCartDisplay();

  // Obtener datos de productos y asociar el evento de clic a los botones "Agregar al carrito"
  const products = extractProductData();
  document.querySelectorAll(".btn-add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      const product = products.find((p) => p.id === productId);
      if (product) {
        addToCart(product.id, product.name, product.price, product.image);
      }
    });
  });
});
