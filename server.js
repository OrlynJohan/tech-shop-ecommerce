const express = require('express');
const app = express();
app.use(express.json()); // Para que el servidor entienda JSON

// --- UNIDAD 3 Y 4: CLASES, ENCAPSULACIÓN Y HERENCIA ---
class Producto {
    #precio; // Encapsulamiento (Privado)
    constructor(id, nombre, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.#precio = precio;
        this.categoria = categoria;
    }
    get precio() { return this.#precio; }
}

// HERENCIA (UNIDAD 4)
class ProductoFisico extends Producto {
    constructor(id, nombre, precio, categoria, peso) {
        super(id, nombre, precio, categoria);
        this.peso = peso;
    }
}

class Carrito {
    constructor() { this.productos = []; }

    // MANEJO DE ERRORES (TRY-CATCH)
    agregar(producto) {
        try {
            if (!producto.nombre) throw new Error("Producto inválido");
            this.productos.push(producto);
            return { success: true, msg: `Añadido: ${producto.nombre}` };
        } catch (e) {
            return { success: false, msg: e.message };
        }
    }

    // PROGRAMACIÓN FUNCIONAL (UNIDAD 1 Y 2)
    obtenerTotal() {
        const subtotal = this.productos.reduce((acc, p) => acc + p.precio, 0);
        const iva = subtotal * 0.15;
        return { subtotal, iva, total: subtotal + iva };
    }
}

const miCarrito = new Carrito();
const inventario = [
    new ProductoFisico(1, "Laptop Gamer", 1200, "Hardware", "2kg"),
    new ProductoFisico(2, "Mouse Pro", 50, "Accesorios", "0.1kg")
];

// --- LOS 8 SERVICIOS WEB (PUNTO III.c) ---

// 1. Bienvenida
app.get('/', (req, res) => res.json({ mensaje: "Bienvenido a Tech-Shop API" }));

// 2. Ver Inventario
app.get('/productos', (req, res) => res.json(inventario));

// 3. Ver Carrito
app.get('/carrito', (req, res) => res.json(miCarrito.productos));

// 4. Agregar al Carrito (POST)
app.post('/carrito/agregar', (req, res) => {
    const prod = inventario.find(p => p.id === req.body.id);
    const result = miCarrito.agregar(prod);
    res.json(result);
});

// 5. Ver Total con IVA (Cálculo Funcional)
app.get('/carrito/total', (req, res) => res.json(miCarrito.obtenerTotal()));

// 6. Vaciar Carrito
app.delete('/carrito/vaciar', (req, res) => {
    miCarrito.productos = [];
    res.json({ msg: "Carrito vacío" });
});

// 7. Buscar Producto por ID
app.get('/productos/:id', (req, res) => {
    const prod = inventario.find(p => p.id == req.params.id);
    res.json(prod || { error: "No encontrado" });
});

// 8. Estado del Sistema
app.get('/status', (req, res) => res.json({ status: "Online", fecha: new Date() }));

app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));
