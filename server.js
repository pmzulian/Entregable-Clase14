"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productos_1 = __importDefault(require("./productos"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var app = express_1.default();
var puerto = 8080;
var router = express_1.default.Router();
app.use("/api", router);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app
    .listen(puerto, function () {
    return console.log("Escuchando peticiones puerto localhost:" + puerto);
})
    .on("error", function (error) { return console.log("Error en servidor " + error); });
var nuevosProductos = new productos_1.default();
app.post("/api/productos/guardar", function (req, res) {
    nuevosProductos.guardar(__assign(__assign({}, req.body), { id: nuevosProductos.getId() }));
    res.send(req.body);
});
app.get("/api/productos/listar", function (req, res) {
    var todos = nuevosProductos.listarTodos();
    if (todos.length > 0) {
        res.send(todos);
    }
    else {
        res.json({ error: "No hay productos cargados" });
    }
});
app.get("/api/productos/listar/:id", function (req, res) {
    var found = nuevosProductos.listarIndividual(req.params.id);
    console.log(found);
    if (found) {
        res.send(found);
    }
    else {
        res.json({ error: "No hay producto con el id indicado" });
    }
});
//Creamos la estructura con express.router
router.put("/productos/actualizar/:id", function (req, res) {
    var ubicacion = req.params.id;
    var actualizar = req.body;
    if (ubicacion <= nuevosProductos.productos.length) {
        nuevosProductos.productos = nuevosProductos.productos.map(function (p) {
            if (p.id == ubicacion) {
                p = Object.assign(p, actualizar);
            }
            return p;
        });
        res.json(__assign({}, nuevosProductos.productos));
    }
    else {
        res.send("No hay producto con el índice " + ubicacion);
    }
});
router.delete("/productos/borrar/:id", function (req, res) {
    var id = req.params.id;
    var productoBuscado = nuevosProductos.productos.find(function (p) {
        return p.id == id;
    });
    if (productoBuscado) {
        var borrado = nuevosProductos.borrar(id);
        res.send(borrado);
    }
    else {
        res.send("No exite el produco");
    }
});
// app.use("/formulario", express.static("public"));
//Configuramos handlebars
app.engine("hbs", express_handlebars_1.default({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials/",
}));
//Establecemos el motor de plantillas a utilizar
app.set("view engine", "hbs");
//Establecemos el directorio donde se encuentran las plantillas
app.set("views", "./views");
//Espacio público del servidor
app.use(express_1.default.static(__dirname + "/public"));
//Servimos el cuerpo de la página main.hbs en el contenedor index.hbs
app.get("/productos/vista", function (req, res) {
    var todos = nuevosProductos.listarTodos();
    res.render("main", { sugeridosProd: todos, listadoExiste: todos.length });
});
//Servimos el formulario de ingreso de datos
app.use("/formulario", express_1.default.static("public"));
