import express from "express";
import crearProd from "./productos.js";
import handlebars from "express-handlebars";

const app = express();

const puerto: Number = 8080;

const router = express.Router();

app.use("/api", router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .listen(puerto, () =>
    console.log(`Escuchando peticiones puerto localhost:${puerto}`)
  )
  .on("error", (error) => console.log(`Error en servidor ${error}`));

const nuevosProductos:any = new crearProd();

app.post("/api/productos/guardar", (req, res) => {
  nuevosProductos.guardar({
    ...req.body,
    id: nuevosProductos.getId(),
  });
  res.send(req.body);
});

app.get("/api/productos/listar", (req, res) => {
  const todos = nuevosProductos.listarTodos();
  if (todos.length > 0) {
    res.send(todos);
  } else {
    res.json({ error: "No hay productos cargados" });
  }
});

app.get("/api/productos/listar/:id", (req, res) => {
  let found:Number = nuevosProductos.listarIndividual(req.params.id);
  console.log(found);
  if (found) {
    res.send(found);
  } else {
    res.json({ error: "No hay producto con el id indicado" });
  }
});

//Creamos la estructura con express.router

router.put("/productos/actualizar/:id", (req, res) => {
  const ubicacion:any = req.params.id;
  const actualizar:any = req.body;

  if (ubicacion <= nuevosProductos.productos.length) {
    nuevosProductos.productos = nuevosProductos.productos.map((p: { id: any; }) => {
      if (p.id == ubicacion) {
        p = Object.assign(p, actualizar);
      }
      return p;
    });
    res.json({
      ...nuevosProductos.productos,
    });
  } else {
    res.send("No hay producto con el índice " + ubicacion);
  }
});

router.delete("/productos/borrar/:id", (req, res) => {
  let id:any = req.params.id;

  let productoBuscado = nuevosProductos.productos.find((p: { id: any; }) => {
    return p.id == id;
  });

  if (productoBuscado) {
    let borrado = nuevosProductos.borrar(id);

    res.send(borrado);
  } else {
    res.send("No exite el produco");
  }
});

// app.use("/formulario", express.static("public"));

//Configuramos handlebars
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials/",
  })
);

//Establecemos el motor de plantillas a utilizar
app.set("view engine", "hbs");

//Establecemos el directorio donde se encuentran las plantillas
app.set("views", "./views");

//Espacio público del servidor
app.use(express.static(__dirname + "/public"));

//Servimos el cuerpo de la página main.hbs en el contenedor index.hbs
app.get("/productos/vista", (req, res) => {
    const todos = nuevosProductos.listarTodos();
    res.render("main", {sugeridosProd: todos, listadoExiste: todos.length})
})

//Servimos el formulario de ingreso de datos
app.use("/formulario", express.static("public"));
