// CLASE CON ENCAPSULACIÓN (UNIDAD 3)
class Producto {
    #precio; 
    constructor(id, nombre, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.#precio = precio;
    }
    get precio() { return this.#precio; }
}

// GESTOR DE DATOS CON MANEJO DE ERRORES
class Carrito {
    constructor() { this.productos = []; }

    agregarProducto(producto) {
        try {
            if (!(producto instanceof Producto)) {
                throw new Error(`¡Dato inválido detectado!`);
            }
            this.productos = [...this.productos, producto];
            console.log(`✅ Añadido: ${producto.nombre}`);
        } catch (error) {
            console.error(`❌ SEGURIDAD: ${error.message}`);
        }
    }

    calcularTotal() {
        // PROGRAMACIÓN FUNCIONAL (UNIDAD 1)
        const total = this.productos.reduce((acc, p) => acc + p.precio, 0);
        return total * 1.15; // + IVA
    }
}

// PRUEBA REAL
const tienda = new Carrito();
tienda.agregarProducto(new Producto(1, "Laptop", 1000, "PC"));
tienda.agregarProducto({ nombre: "Hack", precio: 0 }); // Esto forzará el error para el video
console.log(`Total Final: $${tienda.calcularTotal()}`);
