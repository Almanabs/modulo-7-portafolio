document.addEventListener("DOMContentLoaded", () => {
  const agregarCarritoButtons = document.querySelectorAll(".agregar-carrito");

  agregarCarritoButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-id");
      const stock = event.target.getAttribute("data-stock");
      agregarCarro(id, stock);
    });
  });
});


  