// Simulación de base de datos inmutable
const productos = [
  { id: 1, nombre: "Laptop Gamer", precio: 1200, categoria: "Computación" },
  { id: 2, nombre: "Mouse Óptico", precio: 25, categoria: "Accesorios" },
  { id: 3, nombre: "Monitor 4K", precio: 400, categoria: "Computación" }
];

// --- FUNCIONES PURAS (Programación Funcional) ---

// 1. Función para filtrar por categoría
const filtrarPorCategoria = (lista, categoria) => 
  lista.filter(p => p.categoria === categoria);

// 2. Función para calcular el total con IVA (15%) usando reduce
const calcularTotalConIva = (lista) => 
  lista.reduce((total, p) => total + (p.precio * 1.15), 0);

// --- EJECUCIÓN ---
const computacion = filtrarPorCategoria(productos, "Computación");
const totalCompra = calcularTotalConIva(computacion);

console.log("Productos de Computación:", computacion);
console.log("Total a pagar con IVA:", totalCompra.toFixed(2));
