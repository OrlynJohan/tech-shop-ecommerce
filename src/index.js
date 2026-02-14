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
/**
 * UNIDAD 3: DEFINICIÓN DE INTERFACES Y ENCAPSULACIÓN
 * Definimos una interfaz conceptual para asegurar que todo producto tenga 
 * las propiedades básicas antes de ser procesado.
 */

class Producto {
    // ENCAPSULACIÓN: El uso de '#' define atributos privados.
    // Esto impide que el precio sea modificado externamente sin validación.
    #precio; 

    constructor(id, nombre, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.#precio = precio;
    }

    // Getter: Interfaz de acceso al atributo privado
    get precio() {
        return this.#precio;
    }
}

/**
 * UNIDAD 2: ESTRUCTURAS DE DATOS Y LÓGICA DE GESTIÓN
 */
class Carrito {
    constructor() {
        // Estructura de datos interna: Array de objetos
        this.productos = []; 
    }

    /**
     * MANEJO DE ERRORES (Unidad 3): Uso de Try-Catch para robustez.
     * Validamos que solo objetos de la clase Producto entren al sistema.
     */
    agregarProducto(producto) {
        try {
            if (!(producto instanceof Producto)) {
                throw new Error(`El elemento "${producto.nombre || 'desconocido'}" no es una instancia de Producto.`);
            }
            if (producto.precio <= 0) {
                throw new Error("El precio debe ser mayor a cero.");
            }
            
            // PROGRAMACIÓN FUNCIONAL (Unidad 1): Inmutabilidad
            // Usamos el operador spread para generar un nuevo estado de la lista.
            this.productos = [...this.productos, producto];
            console.log(`✅ Éxito: ${producto.nombre} agregado al carrito.`);
            
        } catch (error) {
            console.error(`❌ ERROR CRÍTICO: ${error.message}`);
        }
    }

    /**
     * UNIDAD 1: PROGRAMACIÓN FUNCIONAL (Funciones de Orden Superior)
     * Implementación de 'reduce' para el cálculo de totales.
     */
    calcularTotal() {
        const subtotal = this.productos.reduce((acumulador, p) => acumulador + p.precio, 0);
        const IVA = 0.15;
        return subtotal * (1 + IVA);
    }

    mostrarResumen() {
        console.table(this.productos); // Demuestra visualmente la estructura de datos
        console.log(`Total Final con Impuestos: $${this.calcularTotal().toFixed(2)}`);
    }
}

// --- DEMOSTRACIÓN DE FUNCIONAMIENTO ---
const tienda = new Carrito();

// 1. Casos de éxito
tienda.agregarProducto(new Producto(101, "Laptop", 1200, "Hardware"));
tienda.agregarProducto(new Producto(102, "Mouse", 25, "Accesorios"));

// 2. CASO DE ERROR (Para el video): Intentar agregar un objeto plano que no es clase Producto
tienda.agregarProducto({ nombre: "Infiltrado", precio: 10 }); 

tienda.mostrarResumen();
