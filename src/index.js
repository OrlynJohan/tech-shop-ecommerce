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
/**
 * PASO 1: Definición de la Interfaz (vía comentarios de JSDoc en JS)
 * @interface IProducto
 * @property {number} id
 * @property {string} nombre
 * @property {number} precio
 */

// PASO 2: Implementación de Clase con ENCAPSULACIÓN
class Producto {
    #precio; // Propiedad privada (Encapsulación)

    constructor(id, nombre, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.#precio = precio;
    }

    // Getter para acceder al precio de forma controlada
    get precio() {
        return this.#precio;
    }
}

class Carrito {
    constructor() {
        this.productos = []; // Lista de productos (Estructura de datos)
    }

    // MANEJO DE ERRORES: Validar que el producto sea válido
    agregarProducto(producto) {
        try {
            if (!(producto instanceof Producto)) {
                throw new Error("El objeto no es un producto válido.");
            }
            this.productos = [...this.productos, producto]; // Inmutabilidad (Funcional)
            console.log(`✅ ${producto.nombre} añadido.`);
        } catch (error) {
            console.error("Error al agregar:", error.message);
        }
    }

    // FUNCIONALIDAD COMPLEJA: Uso de Reduce (Programación Funcional)
    calcularTotal() {
        /**
         * Utilizamos reduce para acumular el precio de los productos.
         * Es una función pura que no modifica el array original.
         */
        const subtotal = this.productos.reduce((acc, p) => acc + p.precio, 0);
        const conIva = subtotal * 1.15;
        return conIva;
    }

    mostrarRecibo() {
        console.log("--- RECIBO DE COMPRA ---");
        this.productos.forEach(p => console.log(`- ${p.nombre}: $${p.precio}`));
        console.log(`TOTAL (IVA 15%): $${this.calcularTotal().toFixed(2)}`);
    }
}

// --- PRUEBA DEL SISTEMA ---
const laptop = new Producto(1, "Laptop Gamer", 1200, "Tech");
const mouse = new Producto(2, "Mouse", 25, "Accesorios");

const miCarrito = new Carrito();
miCarrito.agregarProducto(laptop);
miCarrito.agregarProducto(mouse);

// Intento de error
miCarrito.agregarProducto({ nombre: "Falso", precio: 0 }); 

miCarrito.mostrarRecibo();
