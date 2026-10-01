// ============================================================
// tienda.js — Brisa Moda
// Nuestro JavaScript. Se carga después de Bootstrap, por eso
// aquí ya existe el objeto «bootstrap».
// ============================================================
// ===== PASO 8: Filtrar productos por categoría =====
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const columnasProducto = document.querySelectorAll('[data-categoria]');

botonesFiltro.forEach((boton) => {
  boton.addEventListener('click', () => {
    // 1. Marcar el botón pulsado (negro) y desmarcar los demás
    botonesFiltro.forEach((b) => {
      b.classList.remove('active', 'btn-dark');
      b.classList.add('btn-outline-dark');
    });
    boton.classList.add('active', 'btn-dark');
    boton.classList.remove('btn-outline-dark');

    // 2. Mostrar u ocultar cada producto con la utilidad d-none
    const categoria = boton.dataset.filtro;
    columnasProducto.forEach((columna) => {
      const mostrar = categoria === 'todos' || columna.dataset.categoria === categoria;
      columna.classList.toggle('d-none', !mostrar);
    });
  });
});

// ===== PASO 9: Carrito - agregar productos =====
const carrito = [];
const formatoPesos = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

// Muestra el aviso (toast) con un mensaje
function mostrarAviso(mensaje) {
  const aviso = document.getElementById('avisoCarrito');
  aviso.querySelector('.toast-body').textContent = mensaje;
  bootstrap.Toast.getOrCreateInstance(aviso).show();
}

// Agrega un producto y avisa a toda la página que el carrito cambió
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  document.dispatchEvent(new CustomEvent('carrito:cambio'));
  mostrarAviso(`«${nombre}» se agregó al carrito`);
}

// Cada botón «Agregar» lee sus atributos data-nombre y data-precio
document.querySelectorAll('.btn-agregar').forEach((boton) => {
  boton.addEventListener('click', () => {
    agregarAlCarrito(boton.dataset.nombre, Number(boton.dataset.precio));
  });
});

// Cuando el carrito cambia, se actualiza el contador de la barra
document.addEventListener('carrito:cambio', () => {
  document.getElementById('contadorCarrito').textContent = carrito.length;
});