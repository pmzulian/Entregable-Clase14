"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenerarProductos = /** @class */ (function () {
    function GenerarProductos() {
        this.productos = [];
    }
    GenerarProductos.prototype.getId = function () {
        return this.productos.length + 1;
    };
    GenerarProductos.prototype.guardar = function (producto) {
        this.productos.push(producto);
    };
    GenerarProductos.prototype.listarTodos = function () {
        return this.productos;
    };
    GenerarProductos.prototype.listarIndividual = function (id) {
        return this.productos[id - 1];
    };
    GenerarProductos.prototype.borrar = function (id) {
        var index = this.productos.findIndex(function (prod) { return prod.id == id; });
        return this.productos.splice(index, 1);
    };
    return GenerarProductos;
}());
//const nuevosProductos = new GenerarProductos();
/* nuevosProductos.guardar({
  id: nuevosProductos.getId(),
  title: "Computadora Desktop",
  price: 120000,
  thumbnail:
    "https://www.flaticon.es/icono-gratis/ordenador-de-sobremesa_1792525",
});

nuevosProductos.guardar({
  id: nuevosProductos.getId(),
  title: "Televisor SmarTV",
  price: 90000,
  thumbnail: "https://www.flaticon.es/icono-gratis/televisor_4384367",
});
 */
// nuevosProductos.listarIndividual(2)
// nuevosProductos.productos.forEach(index => console.log(index))
// nuevosProductos.borrar(1)
// console.log(nuevosProductos.listarTodos())
exports.default = GenerarProductos;
